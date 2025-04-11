# Real Estate Semantic Search

A lightweight semantic search implementation for real estate listings, allowing users to search using natural language queries like "modern and bright penthouse with ocean views" to find relevant properties.

## Overview

This project implements a vector-based semantic search system for real estate listings:

- **Data Source**: Airbnb dataset from MongoDB (via HuggingFace), including listing descriptions, images, and pre-computed embeddings using OpenAI's text-embedding-3-small model
- **Backend**: FastAPI application that performs real-time semantic search
- **Frontend**: Simple UI built with Lovable (with custom modifications) for query input and results display
- **Search Engine**: FAISS (Facebook AI Similarity Search) vector index for efficient similarity search

## How It Works

1. **Indexing Pipeline**:
   - Loads listing data including pre-computed embeddings
   - Builds an in-memory FAISS index optimized for cosine similarity
   - Makes the index available for the search API

2. **Search Flow**:
   - User enters a natural language query in the frontend
   - Query is sent to the FastAPI backend
   - Backend converts the query to an embedding vector using the same OpenAI model
   - FAISS index performs efficient similarity search to find the most semantically similar listings
   - Top N results are returned and displayed in the frontend with images and details

## Technical Stack

- **Backend**: FastAPI
- **Vector Search**: FAISS
- **Embeddings**: OpenAI text-embedding-3-small
- **Frontend**: Lovable (with custom modifications)
- **Dataset**: MongoDB Airbnb listings

## Getting Started

### Prerequisites

- Python 3.8+
- Required Python packages (see `requirements.txt`)
- Access to the MongoDB Airbnb dataset from HuggingFace

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/real-estate-semantic-search.git
cd real-estate-semantic-search

# Install dependencies
pip install -r requirements.txt

# Download dataset (if not already available)
# Instructions for accessing the MongoDB Airbnb dataset
```

### Running the Application

```bash
# Start the backend server
uvicorn app.backend.app-backend:app --reload

# In a separate terminal, start the frontend
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` to access the application.

```

## Future Improvements

- Craft evals
- Train a two tower model on top of embeddings to improve results
- Expand to larger real estate datasets

