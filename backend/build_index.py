# backend/build_index.py
import os
import pickle
from pathlib import Path
from typing import List, Dict

import faiss
from sentence_transformers import SentenceTransformer

DATA_DIR = Path("data")
INDEX_PATH = "index.faiss"
META_PATH = "index_meta.pkl"
MODEL_NAME = "all-MiniLM-L6-v2"
EMB_DIM = 384  # embedding dim for all-MiniLM-L6-v2

def load_texts_from_folder(folder: Path) -> List[Dict]:
    docs = []
    for p in sorted(folder.rglob("*")):
        if p.is_file() and p.suffix.lower() in [".txt", ".md"]:
            text = p.read_text(encoding="utf-8", errors="ignore")
            docs.append({"text": text, "source": str(p.relative_to(folder))})
    return docs

def build_index(docs: List[Dict], model_name: str = MODEL_NAME):
    model = SentenceTransformer(model_name)
    texts = [d["text"] for d in docs]
    print(f"[build_index] Encoding {len(texts)} documents...")
    embeddings = model.encode(texts, show_progress_bar=True, convert_to_numpy=True)

    import numpy as np
    embeddings = embeddings.astype('float32')
    index = faiss.IndexFlatIP(EMB_DIM)  # inner product (cosine if embeddings normalized)
    # normalize for cosine similarity
    faiss.normalize_L2(embeddings)
    index.add(embeddings)
    print(f"[build_index] Index built. n_total: {index.ntotal}")
    # Save
    faiss.write_index(index, INDEX_PATH)
    meta = {"documents": docs, "model_name": model_name, "dim": EMB_DIM}
    with open(META_PATH, "wb") as f:
        pickle.dump(meta, f)
    print(f"[build_index] Saved index -> {INDEX_PATH} and meta -> {META_PATH}")

def main():
    if not DATA_DIR.exists():
        print(f"[ERROR] Data dir {DATA_DIR} not found. Create backend/data/ and add .txt/.md files.")
        return
    docs = load_texts_from_folder(DATA_DIR)
    if not docs:
        print("[ERROR] No documents found in data/ (supported: .txt, .md)")
        return
    build_index(docs)

if __name__ == "__main__":
    main()
