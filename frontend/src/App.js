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
import { Info as InfoIcon, GitHub, LinkedIn } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

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
      alert("Please select a file first!");
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
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* About Section - Fixed Position */}
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <IconButton onClick={() => setAboutOpen(!aboutOpen)} color="primary">
            <InfoIcon />
          </IconButton>

          <AnimatePresence>
            {aboutOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  position: "absolute", // Ensures it doesn't affect layout
                  top: "100%", // Positions below the button
                  right: 0, // Aligns to the right
                  zIndex: 10, // Ensures it's above other elements
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: 1.5,
                    bgcolor: "#ffffff",
                    borderRadius: 2,
                    boxShadow: 3,
                    width: "150px",
                  }}
                >
                  <Avatar
                    src="/assets/ashish.jpg"
                    alt="Ashish Goswami"
                    sx={{ width: 50, height: 50, margin: "auto" }}
                  />
                  <Typography variant="body2" fontWeight="bold" mt={0.5}>
                    Ashish Goswami
                  </Typography>
                  <Typography variant="caption" color="gray">
                    (Developer of this website)
                  </Typography>

                  {/* Animated Icons */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <IconButton
                      href="https://github.com/Ashish6298"
                      target="_blank"
                      size="small"
                    >
                      <GitHub fontSize="small" />
                    </IconButton>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <IconButton
                      href="https://www.linkedin.com/in/ashish-goswami-58797a24a/"
                      target="_blank"
                      size="small"
                    >
                      <LinkedIn fontSize="small" />
                    </IconButton>
                  </motion.div>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Title */}
        <Typography
          variant={isMobile ? "h4" : "h3"}
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          DocLens - AI Document Summarizer !
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          p={isMobile ? 2 : 5}
          bgcolor="white"
          borderRadius={3}
          boxShadow={5}
        >
          {/* Left Side - Upload Section */}
          <Box
            flex={1}
            p={isMobile ? 3 : 5}
            bgcolor="#f8f9fa"
            borderRadius={2}
            boxShadow={3}
            textAlign="center"
            sx={{ minHeight: "250px" }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              gutterBottom
            >
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
            p={isMobile ? 3 : 4}
            bgcolor="#fff3cd"
            borderRadius={2}
            boxShadow={3}
            textAlign="center"
            display="flex"
            flexDirection="column"
            sx={{ minHeight: "250px" }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              gutterBottom
            >
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
