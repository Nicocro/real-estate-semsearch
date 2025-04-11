from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import faiss
import numpy as np
import pickle
import openai
import os
from typing import Dict
import sys 
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load FAISS index and property descriptions
index = faiss.read_index(os.path.join(PROJECT_ROOT, "text_embeddings.index"))
with open(os.path.join(PROJECT_ROOT, "metadata.pkl"), "rb") as f:
    metadata = pickle.load(f)

# OpenAI API Key (Replace with your key)
openai_api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = openai_api_key

# FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Request model
class SearchQuery(BaseModel):
    query: str
    top_n: int = 3  # Default: Return top 5 matches

def embed_query(query):
    """Convert user query into an embedding using OpenAI API."""
    response = openai.embeddings.create(
        model="text-embedding-3-small",
        input=query
    )
    embedding = np.array(response.data[0].embedding).reshape(1, -1)
    #normalize the embedding to unit length
    norm = np.linalg.norm(embedding)
    normalized_emb = embedding / norm
    query_embedding = normalized_emb.reshape(1, -1)
    logger.info(f"query embedding shape: {query_embedding.shape}")
    return query_embedding

@app.post("/search/")
def search_properties(query: SearchQuery):
    """Searches properties based on semantic similarity."""
    query_embedding = embed_query(query.query)
    distances, indices = index.search(query_embedding, query.top_n)
    
    results = [{
        "id": int(indices[0][j]),  # The ID is now directly from FAISS index
        "description": metadata[int(indices[0][j])]["description"],
        "images": {
            "thumbnail": metadata[int(indices[0][j])]["images"].get("thumbnail_url", ""),
            "medium": metadata[int(indices[0][j])]["images"].get("medium_url", ""),
            "full": metadata[int(indices[0][j])]["images"].get("picture_url", "")
        },
        "distance": float(distances[0][j])
    } for j in range(len(indices[0]))]

    results = sorted(results, key=lambda x: x["distance"], reverse=True)  # Note: reverse=True since higher is better for IP
    logger.info(f"distances: {distances}")
    
    return {"results": results}