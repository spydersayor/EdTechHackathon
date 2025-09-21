import os
import pickle
import faiss
import gradio as gr
from sentence_transformers import SentenceTransformer

INDEX_PATH = "index.faiss"
META_PATH = "index_meta.pkl"
EMB_MODEL_NAME = "all-MiniLM-L6-v2"

# Load model only once
model = SentenceTransformer(EMB_MODEL_NAME)

def load_index():
    if os.path.exists(INDEX_PATH) and os.path.exists(META_PATH):
        index = faiss.read_index(INDEX_PATH)
        import pickle
        with open(META_PATH, "rb") as f:
            meta = pickle.load(f)
        return index, meta
    return None, None

index, meta = load_index()

def semantic_search_fn(query, top_k=5):
    if index is None or meta is None:
        return "Index not found. Run `python build_index.py` first!"
    
    q_emb = model.encode(query, convert_to_numpy=True)
    D, I = index.search(q_emb.reshape(1, -1), top_k)
    results = []
    for score, idx in zip(D[0], I[0]):
        if idx < 0: 
            continue
        item = meta["documents"][idx]
        text = item["text"][:500]  # cut long text
        results.append(f"Score: {score:.4f}\n{text}\n---")
    return "\n\n".join(results) if results else "No results found."

# 🎛 Gradio UI
demo = gr.Interface(
    fn=semantic_search_fn,
    inputs=[gr.Textbox(label="Enter your query"), gr.Slider(1, 10, value=5, step=1, label="Results (k)")],
    outputs="text",
    title="CampusHire AI — Semantic Search",
    description="Ask any question and retrieve semantically similar resume/job-match results."
)

if __name__ == "__main__":
    demo.launch(share=True)