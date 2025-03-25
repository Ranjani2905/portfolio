from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from  scripts.chatbot import get_response  # Import chatbot function

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    response = get_response(request.message)
    return {"response": response}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
