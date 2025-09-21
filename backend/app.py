# backend/app.py
import os
import pickle
from typing import List, Dict

import faiss
import streamlit as st
from sentence_transformers import SentenceTransformer, util

INDEX_PATH = "index.faiss"
META_PATH = "index_meta.pkl"
EMB_MODEL_NAME = "all-MiniLM-L6-v2"

@st.cache_resource
def load_embedding_model():
    return SentenceTransformer(EMB_MODEL_NAME)

def load_index():
    if os.path.exists(INDEX_PATH) and os.path.exists(META_PATH):
        index = faiss.read_index(INDEX_PATH)
        with open(META_PATH, "rb") as f:
            meta = pickle.load(f)
        return index, meta
    return None, None

def semantic_search(index, meta, query: str, top_k: int = 5):
    model = load_embedding_model()
    q_emb = model.encode(query, convert_to_numpy=True)
    D, I = index.search(q_emb.reshape(1, -1), top_k)
    results: List[Dict] = []
    for score, idx in zip(D[0], I[0]):
        if idx < 0:
            continue
        item = meta["documents"][idx]
        results.append({"score": float(score), "text": item["text"], "source": item.get("source")})
    return results

def main():
    st.set_page_config(page_title="EdTech Retrieval Demo", layout="wide")
    st.title("EdTechHackathon — Semantic Search Demo")

    st.markdown(
        """
        This demo uses a prebuilt FAISS index + sentence-transformers embeddings.
        If index is missing, run `python build_index.py` in the backend folder to create it.
        """
    )

    index, meta = load_index()
    if index is None:
        st.warning("Index not found. Run `python build_index.py` in backend/ to build the index from backend/data/")
        st.stop()

    query = st.text_input("Enter your query", "")
    k = st.slider("Results (k)", min_value=1, max_value=10, value=5)

    if st.button("Search") and query.strip():
        with st.spinner("Searching..."):
            results = semantic_search(index, meta, query, top_k=k)
        if not results:
            st.info("No results found.")
        else:
            for i, r in enumerate(results, start=1):
                st.subheader(f"Result {i} — score {r['score']:.4f}")
                st.write(r["text"][:2000])
                if r.get("source"):
                    st.caption(f"Source: {r['source']}")

    st.sidebar.header("Index Info")
    if meta:
        st.sidebar.write(f"Documents indexed: {len(meta['documents'])}")
        st.sidebar.write(f"Embedding model: {meta.get('model_name', EMB_MODEL_NAME)}")

if __name__ == "__main__":
    main()
