from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import Chroma
from dotenv import load_dotenv
import os
from uuid import uuid4

# Load environment variables
load_dotenv()

# Paths
DATA_PATH = "data"
CHROMA_PATH = "chroma_db"

# Initialize embedding model
embeddings_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# Initialize vector database
vector_store = Chroma(
    collection_name="student_management_chatbot",
    embedding_function=embeddings_model,
    persist_directory=CHROMA_PATH
)

# Load PDF files
loader = PyPDFDirectoryLoader(DATA_PATH)
raw_documents = loader.load()

# Split documents into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=100)
chunks = text_splitter.split_documents(raw_documents)

# Assign unique IDs
uuids = [str(uuid4()) for _ in chunks]

# Store in ChromaDB
vector_store.add_documents(documents=chunks, ids=uuids)

print("✅ Embeddings stored successfully!")
