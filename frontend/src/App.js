import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Info as InfoIcon, GitHub, LinkedIn, ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for react-toastify

const App = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://doclens.onrender.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSummary(response.data.summary.join("\n\n")); // Join paragraphs for readability
    } catch (error) {
      console.error("Error uploading file:", error);
      setSummary("Failed to summarize document.");
    } finally {
      setLoading(false);
    }
  };

  // Function to copy summary to clipboard
  const handleCopySummary = () => {
    if (summary) {
      navigator.clipboard.writeText(summary).then(() => {
        toast.success("Summary copied to clipboard!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }).catch((err) => {
        console.error("Failed to copy summary:", err);
        toast.error("Failed to copy summary.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      });
    } else {
      toast.warn("No summary to copy!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a1a3d 0%, #2b2b5c 50%, #4a4a8c 100%)",
        p: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Futuristic Background Particles */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "220px",
          height: "220px",
          background: "radial-gradient(circle, rgba(106, 90, 205, 0.4), transparent)",
          top: "8%",
          left: "12%",
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(106, 90, 205, 0.3)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, rgba(147, 112, 219, 0.4), transparent)",
          bottom: "10%",
          right: "8%",
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(147, 112, 219, 0.3)",
        }}
      />

      <Container maxWidth="lg">
        {/* About Section */}
        <Box sx={{ position: "absolute", top: 20, right: 20 }}>
          <IconButton
            onClick={() => setAboutOpen(!aboutOpen)}
            sx={{
              color: "#e6e6fa",
              bgcolor: "rgba(255, 255, 255, 0.15)",
              "&:hover": { bgcolor: "rgba(147, 112, 219, 0.3)", transform: "scale(1.1)" },
              transition: "all 0.3s",
              boxShadow: "0 0 10px rgba(147, 112, 219, 0.4)",
            }}
          >
            <InfoIcon />
          </IconButton>

          <AnimatePresence>
            {aboutOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ position: "absolute", top: "100%", right: 0, zIndex: 10 }}
              >
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: 3,
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
                    width: "80px", // Narrow width for a thin strip
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(147, 112, 219, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2, // Spacing between elements
                  }}
                >
                  <Avatar
                    src="/assets/ashish.jpg"
                    alt="Ashish Goswami"
                    sx={{ width: 50, height: 50, border: "2px solid #9370db" }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="#1a1a3d"
                    sx={{ fontFamily: "'Poppins', sans-serif", textAlign: "center" }}
                  >
                    Ashish Goswami
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <IconButton href="https://github.com/Ashish6298" target="_blank" size="small">
                      <GitHub sx={{ color: "#1a1a3d", "&:hover": { color: "#9370db" } }} />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com/in/ashish-goswami-58797a24a/" target="_blank" size="small">
                      <LinkedIn sx={{ color: "#1a1a3d", "&:hover": { color: "#9370db" } }} />
                    </IconButton>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            fontWeight="bold"
            textAlign="center"
            sx={{
              mb: 6,
              color: "#e6e6fa",
              textShadow: "0 0 20px rgba(147, 112, 219, 0.6), 0 0 5px rgba(106, 90, 205, 0.8)",
              fontFamily: "'Exo 2', sans-serif",
              letterSpacing: "2px",
            }}
          >
            DocLens: AI-Powered Document Summarizer
          </Typography>
        </motion.div>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          p={isMobile ? 3 : 4}
          bgcolor="rgba(255, 255, 255, 0.1)"
          borderRadius={4}
          boxShadow="0 0 40px rgba(0, 0, 0, 0.4)"
          sx={{ backdropFilter: "blur(12px)", border: "1px solid rgba(147, 112, 219, 0.3)" }}
        >
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: 1 }}
          >
            <Box
              p={isMobile ? 3 : 4}
              bgcolor="rgba(255, 255, 255, 0.12)"
              borderRadius={3}
              boxShadow="0 0 25px rgba(0, 0, 0, 0.3)"
              textAlign="center"
              sx={{ minHeight: "340px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <Box>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  fontWeight="bold"
                  sx={{
                    color: "#87ceeb",
                    fontFamily: "'Poppins', sans-serif",
                    mb: 3,
                    textShadow: "0 0 10px rgba(135, 206, 235, 0.5)",
                  }}
                >
                  🌟 Upload Your File
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3,
                    px: 2, // Add padding to ensure the input doesn't overflow
                  }}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                      padding: "15px",
                      borderRadius: "12px",
                      border: "2px dashed #87ceeb",
                      background: "rgba(255, 255, 255, 0.08)",
                      color: "#e6e6fa",
                      width: "100%", // Ensure it takes full width within the container
                      maxWidth: "100%", // Prevent overflow
                      boxSizing: "border-box", // Include padding/border in width calculation
                      cursor: "pointer",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "16px",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.borderColor = "#e6e6fa";
                      e.target.style.boxShadow = "0 0 12px rgba(135, 206, 235, 0.6)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.borderColor = "#87ceeb";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={loading}
                sx={{
                  width: "100%",
                  bgcolor: "#9370db",
                  color: "#fff",
                  "&:hover": { bgcolor: "#ba55d3", transform: "scale(1.03)" },
                  transition: "all 0.3s",
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  borderRadius: "12px",
                  boxShadow: "0 0 15px rgba(147, 112, 219, 0.6)",
                  py: 1.5,
                  fontSize: "16px",
                  textTransform: "uppercase",
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Start Analysis"}
              </Button>
            </Box>
          </motion.div>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ flex: 1 }}
          >
            <Box
              p={isMobile ? 3 : 4}
              bgcolor="rgba(255, 255, 255, 0.12)"
              borderRadius={3}
              boxShadow="0 0 25px rgba(0, 0, 0, 0.3)"
              textAlign="center"
              display="flex"
              flexDirection="column"
              sx={{ minHeight: "340px", position: "relative" }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                fontWeight="bold"
                sx={{
                  color: "#87ceeb",
                  fontFamily: "'Poppins', sans-serif",
                  mb: 3,
                  textShadow: "0 0 10px rgba(135, 206, 235, 0.5)",
                }}
              >
                ✨ Your Summary
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  background: "rgba(255, 255, 255, 0.06)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "inset 0 0 15px rgba(0, 0, 0, 0.2)",
                  overflowY: "auto",
                  minHeight: "240px",
                  color: "#e6e6fa",
                  border: "1px solid rgba(147, 112, 219, 0.4)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "16px",
                  lineHeight: 1.8,
                  position: "relative",
                }}
              >
                <Typography variant="body1" textAlign="left">
                  {loading ? (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Analyzing...
                    </motion.div>
                  ) : summary ? (
                    summary
                  ) : (
                    "Upload a file to see a crisp summary!"
                  )}
                </Typography>
                {/* Copy Button */}
                <IconButton
                  onClick={handleCopySummary}
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    color: "#e6e6fa",
                    bgcolor: "rgba(147, 112, 219, 0.3)",
                    "&:hover": { bgcolor: "rgba(147, 112, 219, 0.5)", transform: "scale(1.1)" },
                    transition: "all 0.3s",
                    boxShadow: "0 0 10px rgba(147, 112, 219, 0.4)",
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default App;