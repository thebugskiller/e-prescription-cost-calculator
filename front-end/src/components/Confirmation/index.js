import React from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Confirmation = ({}) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Success!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Your prescription has been saved successfully.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </Container>
  );
};

export default Confirmation;
