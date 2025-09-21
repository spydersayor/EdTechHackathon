# CampusHire AI 🚀  
_Your Smart AI-Powered Resume Screening Assistant_  

CampusHire AI is an **AI-based resume screening application** that uses **semantic search with FAISS + Sentence Transformers** to analyze resumes and recommend the **most suitable job positions** for a candidate.  

Instead of just simple keyword matching, CampusHire AI understands **context, skills, and experience** to give **personalized career guidance** for students and recruiters alike.  

---

## ✨ Features
- 🔎 **Semantic Search:** Uses embeddings (`all-MiniLM-L6-v2`) instead of plain keywords.  
- 📑 **Resume Screening:** Upload multiple resumes as raw text or documents.  
- 🎯 **Job Role Matching:** Suggests which job position is the best fit.  
- ⚡ **FAISS Indexing:** Fast and scalable similarity search for resumes.  
- 🌐 **Gradio Web App:** Simple, user-friendly interface.  
- 🚀 **Deployable on Hugging Face Spaces** in minutes.  

---

## 📂 Project Structure
CampusHireAI/
│── app.py # Main Gradio interface
│── build_index.py # Script to build FAISS index from resumes
│── requirements.txt # Dependencies
│── data/ # Folder containing raw resumes (text files)
│── index.faiss # Prebuilt FAISS index (generated after build_index.py)
│── index_meta.pkl # Metadata for documents
│── README.md # Project documentation
│── .gitignore # Ignore unnecessary files


---

## ⚡ Installation & Usage

### ✅ 1. Clone the Repo
```bash
git clone https://github.com/your-username/CampusHireAI.git
cd CampusHireAI

✅ 2. Create Virtual Environment
    Bash

    python -m venv .venv
    source .venv/bin/activate   # macOS / Linux
    .\.venv\Scripts\activate    # Windows

✅ 3. Install Requirements
    Bash

    pip install -r requirements.txt

✅ 4. Build Resume Index
Put your resumes (in .txt format) in the data/ folder, then run:

Bash

python build_index.py
This will create index.faiss + index_meta.pkl.

✅ 5. Run the App
Bash

python app.py
Gradio UI will open in your browser.

🌍 Deploy on Hugging Face Spaces
Create a new Space on Hugging Face.
Select Gradio as the SDK.
Upload:
app.py
requirements.txt
index.faiss, index_meta.pkl (optional if prebuilt, else build in space).
Click Deploy — within 2–5 minutes your app will be live with a shareable link.
🛠️ Tech Stack
Python 3.9+
Gradio – Interactive web app
Sentence Transformers – Embeddings model
FAISS – Vector similarity search
Hugging Face Spaces – Free deployment
🚀 Future Improvements
📥 Resume upload feature (PDF/Docx → text extraction).
🤖 Chatbot interface for interactive Q&A with resumes.
⚡ Hybrid search (keyword + semantic).
🎯 Integration with LinkedIn API / job portals.

