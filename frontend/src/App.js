import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const App = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error uploading file:", error);
      setSummary("Failed to summarize document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Logo */}
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src="/assets/doclens.png" // Ensure this image is in the public folder
            alt="DocLens Logo"
            style={{ width: "180px", height: "180px" }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          DocLens - AI Document Analyzer
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          p={5} // Increased padding
          bgcolor="white"
          borderRadius={3}
          boxShadow={5}
        >
          {/* Left Side - Upload Section */}
          <Box
            flex={1}
            p={6} // Increased padding
            bgcolor="#f8f9fa"
            borderRadius={2}
            boxShadow={3}
            textAlign="center"
            sx={{ minHeight: "300px" }} // Increased height
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              📂 Upload Document (PDF or Image)
            </Typography>
            <input
              type="file"
              onChange={handleFileChange}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                background: "white",
                width: "100%",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={loading}
              sx={{ mt: 2, width: "100%" }}
            >
              {loading ? <CircularProgress size={24} /> : "Summarize"}
            </Button>
          </Box>

          {/* Right Side - Summary Section */}
          <Box
            flex={1}
            p={4} // Reduced padding
            bgcolor="#fff3cd"
            borderRadius={2}
            boxShadow={3}
            textAlign="center"
            display="flex"
            flexDirection="column"
            sx={{ minHeight: "300px" }} // Keeping the height the same
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              📝 Summary
            </Typography>
            <Box
              sx={{
                flex: 1,
                background: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                overflowY: "auto",
                minHeight: "150px",
              }}
            >
              <Typography variant="body1" textAlign="left">
                {loading
                  ? "Processing..."
                  : summary || "Your summary will appear here."}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
