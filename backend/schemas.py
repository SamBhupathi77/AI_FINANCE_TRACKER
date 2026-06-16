from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional
from enum import Enum

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TransactionType(str, Enum):
    income = "income"
    expense = "expense"

class TransactionCreate(BaseModel):
    amount: float
    transaction_type: TransactionType
    category: str
    description: Optional[str] = None
    date: date

class TransactionResponse(BaseModel):
    id: int
    amount: float
    transaction_type: TransactionType
    category: str
    description: Optional[str]
    date: date
    user_id: int

    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    question: str