# 📄 DocLens - AI-Powered Document Summarizer

DocLens is an AI-powered document analyzer that extracts and summarizes text from **PDFs and images** using **OCR (Tesseract.js)** and **Google Gemini AI**.

## 🚀 Features
- Upload **PDF or Image** files.
- Extract text using **OCR** (for images) or **PDF parsing**.
- Summarize extracted text using **Google Gemini AI**.
- Clean and responsive UI.

## 🛠️ Tech Stack
- **Frontend**: React.js (MUI for UI)
- **Backend**: Node.js, Express.js
- **OCR**: Tesseract.js (for image text extraction)
- **AI Model**: Google Gemini API (for text summarization)

---

## **🌐 Live Deployment**
🔗 **( https://doclens-alpha.vercel.app/)**  

---

## 🎯 How to Run Locally

### 🔹 Prerequisites
- **Node.js** installed
- **Google Gemini API Key** (Create from [Google AI Studio](https://aistudio.google.com/))

### 🔹 Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/ashish6298/DocLens.git
   cd DocLens/backend

2. Install dependencies:
   ```sh
   npm install
   
3. Create a .env file and add:
     ```sh
     PORT=5000
    GEMINI_API_KEY=your_gemini_api_key

4. Start the backend:
    ```sh
    node server.js

### 🔹 Frontend Setup

1. Open a new terminal and go to the frontend directory:
   ```sh
   npm install

2. Install dependencies:
   ```sh
    npm install

3. Start the React app:
   ```sh
    npm start


