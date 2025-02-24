const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 🛠️ Multer storage (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

// 🔥 Upload & Summarization Route
app.post("/upload", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("❌ Multer Error:", err);
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(`📂 File received: ${req.file.originalname}`);

    let extractedText = "";

    try {
      if (req.file.mimetype === "application/pdf") {
        const pdfData = await pdfParse(req.file.buffer);
        extractedText = pdfData.text;
      } else if (req.file.mimetype.startsWith("image/")) {
        const { data: { text } } = await Tesseract.recognize(req.file.buffer, "eng");
        extractedText = text;
      } else {
        return res.status(400).json({ error: "Unsupported file type. Upload PDF or Image." });
      }

      console.log("📄 Extracted Text:", extractedText);

      // ✅ Split text into paragraphs
      const paragraphs = extractedText.split(/\n\s*\n/).filter(p => p.trim() !== "");

      // 🔥 Summarize each paragraph separately
      const summarizedParagraphs = await summarizeParagraphs(paragraphs);

      res.json({ original: paragraphs, summary: summarizedParagraphs });
    } catch (error) {
      console.error("❌ Error processing file:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to summarize document" });
    }
  });
});

// 🔥 Function to summarize each paragraph
async function summarizeParagraphs(paragraphs) {
  const summaries = [];

  for (const para of paragraphs) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`,
        {
          contents: [{ role: "user", parts: [{ text: `Summarize this paragraph:\n\n${para}` }] }]
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: process.env.GEMINI_API_KEY }
        }
      );

      const summary = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available";
      summaries.push(summary);
    } catch (error) {
      console.error("❌ Gemini API Error:", error.response?.data || error.message);
      summaries.push("Error summarizing this paragraph");
    }
  }

  return summaries;
}

// 🔥 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
