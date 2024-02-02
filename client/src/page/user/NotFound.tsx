import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "white",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1" style={{ color: "#33333", textAlign: "center" }}>
        404
      </Typography>
      <Typography variant="h3" style={{ color: "#33333", textAlign: "center" }}>
        Not Found
      </Typography>
      <Button variant="contained" sx={{ mt: 4 }} onClick={() => navigate("/")}>
        Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
