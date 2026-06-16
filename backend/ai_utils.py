import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def generate_financial_summary(transactions: list) -> str:
    if not transactions:
        return "You don't have any transactions yet. Start logging expenses to get financial insights!"
    
    transaction_text = "\n".join([f"- {t.date}: {t.transaction_type.upper()} of ₹{t.amount} for {t.category} ({t.description})" for t in transactions])

    system_prompt = f"""
    You are a helpful financial analysis assistant.
    1. Identify the highest spending category and calculate its total.
    2. Calculate 15% of that category's total.
    3. Output EXACTLY one sentence in this format: 
    "Your highest spending category is [Category], with a total of ₹[Total]. Reducing this category by 15% could save you ₹[Savings]."
    4. If no transactions are provided, output: "No transaction data available to analyze."
    5. Do NOT provide advice, do NOT act as an advisor, and do NOT include any introductory or concluding conversational text.

    Below is the user's transaction history:
    {transaction_text}

    IMPORTANT: Only output the single summary sentence as specified. Do NOT include any additional text, explanations, or formatting.
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt}
            ],
            temperature=0.5,
            max_tokens=200
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Sorry, I couldn't generate a summary right now. Error: {str(e)}"
    
def ask_financial_assistant(transactions: list, question: str) -> str:
    
    if not transactions:
        context = "The user has no recorded transactions yet."
    else:
        context = "\n".join([f"- {t.date}: {t.transaction_type.upper()} of ₹{t.amount} for {t.category} ({t.description})" for t in transactions])

    system_prompt = f"""
    You are a helpful and polite AI financial assistant. 
    Here is the user's transaction history:
    
    {context}
    
    Answer only the user's question without any extra details based ONLY on this transaction history. 
    If they ask something unrelated to their finances, politely steer the conversation back to their budget.
    Keep your answer concise and easy to read. Do not use markdown formatting and don't ask further questions.
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question} 
            ],
            temperature=0.5,
            max_tokens=300
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Sorry, I'm having trouble thinking right now. Error: {str(e)}"