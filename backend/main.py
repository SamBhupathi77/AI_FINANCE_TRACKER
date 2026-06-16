from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from sqlalchemy.orm import Session
import models, schemas, security
from database import engine, Base, SessionLocal
import ai_utils
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {
        "message": "AI Finance Tracker API running"
    }

@app.post("/signup", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = security.get_password_hash(user.password)
    new_user = models.User(name=user.name, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = security.create_access_token(data={"user_id": user.id})
    
    return {"access_token": access_token, "token_type": "bearer"}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
        
    return user

@app.post("/transactions", response_model=schemas.TransactionResponse)
def create_transaction(
    transaction: schemas.TransactionCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_transaction = models.Transaction(
        amount=transaction.amount,
        transaction_type=transaction.transaction_type,
        category=transaction.category,
        description=transaction.description,
        date=transaction.date,
        user_id=current_user.id 
    )
    
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    
    return new_transaction

@app.get("/transactions", response_model=list[schemas.TransactionResponse])
def get_transactions(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    transactions = db.query(models.Transaction).filter(models.Transaction.user_id == current_user.id).all()
    
    return transactions

@app.put("/transactions/{transaction_id}", response_model=schemas.TransactionResponse)
def update_transaction(
    transaction_id: int, 
    updated_transaction: schemas.TransactionCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    if db_transaction.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this transaction")
        
    db_transaction.amount = updated_transaction.amount
    db_transaction.transaction_type = updated_transaction.transaction_type
    db_transaction.category = updated_transaction.category
    db_transaction.description = updated_transaction.description
    db_transaction.date = updated_transaction.date
    
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.delete("/transactions/{transaction_id}")
def delete_transaction(
    transaction_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    if db_transaction.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this transaction")
        
    db.delete(db_transaction)
    db.commit()
    
    return {"message": "Transaction successfully deleted"}

@app.get("/ai/summary")
def get_ai_summary(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    user_transactions = db.query(models.Transaction).filter(models.Transaction.user_id == current_user.id).all()
    
    ai_insight = ai_utils.generate_financial_summary(user_transactions)
    
    return {"summary": ai_insight}

@app.post("/ai/chat")
def chat_with_ai(
    chat_request: schemas.ChatRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    transactions = db.query(models.Transaction).filter(models.Transaction.user_id == current_user.id).all()
    
    answer = ai_utils.ask_financial_assistant(transactions, chat_request.question)
    
    return {"answer": answer}

@app.get("/users/me")
def get_current_user_profile(current_user: models.User = Depends(get_current_user)):
    return {"name": current_user.name}

@app.post("/ai/suggest-category")
def suggest_category(data: dict):
    description = data.get("description", "")
    tx_type = data.get("type", "expense")

    if tx_type == "income":
        categories = "['Salary', 'Freelance', 'Investments', 'Gifts', 'Other']"
    else:
        categories = "['Food & Dining', 'Transportation', 'Housing & Utilities', 'Entertainment', 'Shopping', 'Health', 'Other']"

    system_prompt = f"""
    You are a financial categorization tool. 
    Analyze the transaction description and map it to exactly ONE of these categories: {categories}.
    Return ONLY the exact category name. Do not include any punctuation, quotes, or extra text.
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Description: {description}"}
        ],
        temperature=0.0
    )
    
    category_result = response.choices[0].message.content.strip().replace("'", "").replace('"', '')
    return {"category": category_result}