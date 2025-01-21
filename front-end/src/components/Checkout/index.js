import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { createPrescription } from "../../services/api";
const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCost, setTotalCost] = useState(location.state?.total_cost || 0);

  useEffect(() => {
    const data = location.state;
    if (!data?.medications) {
      console.warn(
        "No medications found. Redirecting to Prescription Summary..."
      );
      navigate("/");
      return;
    }

    setMedications(data.medications);
    setTotalCost(location.state?.total_cost || 0);
  }, [location.state, navigate]);

  const handleConfirmCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await createPrescription({
        medications,
        total_cost: totalCost,
      });
      if (response.data) {
        navigate("/");
        alert("Checkout Confirmed!");
      }
    } catch (err) {
      console.error("Error confirming checkout:", err);
      setError("Failed to confirm checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      {medications.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Medication</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Dosage</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Frequency</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Unit Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medications.map((med, index) => (
                  <TableRow key={index}>
                    <TableCell>{med.name}</TableCell>
                    <TableCell>{med.dosage.dosage_amount}</TableCell>
                    <TableCell>{med.dosage.frequency}</TableCell>
                    <TableCell>{med.dosage.duration}</TableCell>
                    <TableCell>${med.unit_price}</TableCell>
                    <TableCell>${med.total_cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" align="right" gutterBottom sx={{ mt: 2 }}>
            Grand Total: ${totalCost}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmCheckout}
            sx={{ mt: 3 }}
          >
            Confirm Checkout
          </Button>
        </>
      ) : (
        <Typography variant="h6" align="center" gutterBottom>
          No medications to display.
        </Typography>
      )}
    </Container>
  );
};

export default Checkout;
