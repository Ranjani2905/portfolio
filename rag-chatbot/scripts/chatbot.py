from langchain_google_genai.embeddings import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_google_genai.chat_models import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("⚠️ GOOGLE_API_KEY is missing in .env file!")
# Paths
CHROMA_PATH = "chroma_db"

# Initialize models
embeddings_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.5, streaming=True)

# Connect to ChromaDB
vector_store = Chroma(
    collection_name="student_management_chatbot",
    embedding_function=embeddings_model,
    persist_directory=CHROMA_PATH
)

# Retriever
retriever = vector_store.as_retriever(search_kwargs={'k': 5})

# Chatbot function
def get_response(message):
    docs = retriever.invoke(message)
    knowledge = "\n\n".join([doc.page_content for doc in docs])+''

    prompt = f"""
    You are a conversational chatbot, You always motivate people and you always use happy words. 
    your response will be short and crip. You are 
    your repose should be fetched from knowledge section. 
    You are a friendly and supportive assistant. Your goal is to provide kind, motivational, and helpful answers.
Always frame your responses in a simple and encouraging way, making the user feel better and supported.
Use the given knowledge to craft answers, and avoid using any external information beyond "The knowledge" section.

💡 **Guidelines for Response:**
- Be **friendly** and **kind** in tone.
- Keep sentences **simple** and **easy to understand**.
- Add a touch of **motivation** when possible.
- Make the user feel **supported** and **encouraged**.
- If the knowledge does not have an answer, say something **positive and reassuring** instead of leaving the user without guidance.


    📚 **Knowledge Base:**
    {knowledge}

    **User's Question:** {message}
    """

    response = llm.invoke(prompt)
    return response.content

if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        print("Bot:", get_response(user_input))
