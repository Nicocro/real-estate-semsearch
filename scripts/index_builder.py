# script to builf the FAISS index for the vector database of listings

import faiss
import numpy as np
from datasets import load_dataset
import pickle

# load the dataset from huggingface
dataset = load_dataset("MongoDB/airbnb_embeddings", split="train")

# extract relevant columns
listing_id = np.array(dataset["_id"]).astype('int64')
descriptions = dataset["description"]
images = dataset["images"]
descriptions_embeddings = np.array(dataset["text_embeddings"]).astype("float32")

#normalize the embeddings to unit length
norms = np.linalg.norm(descriptions_embeddings, axis=1, keepdims=True)
descriptions_embeddings = descriptions_embeddings / norms

# Build FAISS index
base_index = faiss.IndexFlatIP(descriptions_embeddings.shape[1])  # Inner Product (cosine similarity)
text_index = faiss.IndexIDMap(base_index)
text_index.add_with_ids(descriptions_embeddings, listing_id)

# Save FAISS index and descriptions
faiss.write_index(text_index, "text_embeddings.index")

metadata = {}
for i, id_val in enumerate(listing_id):
    metadata[int(id_val)] = {
        "description": descriptions[i],
        "images": images[i]
    }

with open("metadata.pkl", "wb") as f:
    pickle.dump(metadata, f)

# Test the index to verify it works correctly
query_idx = 0  # Test with the first listing
test_query = descriptions_embeddings[query_idx:query_idx+1]
test_id = listing_id[query_idx]

D, I = text_index.search(test_query, 1)  # Search for nearest neighbor
retrieved_id = I[0][0]  # This should match test_id

print(f"Query ID: {test_id}, Retrieved ID: {retrieved_id}")
print(f"Match: {'Yes' if test_id == retrieved_id else 'No'}")

print("✅ FAISS index and metadata saved successfully.")