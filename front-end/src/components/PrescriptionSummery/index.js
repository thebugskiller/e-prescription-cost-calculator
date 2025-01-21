import React, { useState, useCallback, useMemo } from "react";
import {
  Button,
  Typography,
  TextField,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { optimizePrescription } from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";

const PrescriptionSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [medications, setMedications] = useState(
    location.state?.medications || []
  );
  const [minimumBudget, setMinimumBudget] = useState(
    location.state?.minimum_budget || 0
  );
  const [totalCost, setTotalCost] = useState(location.state?.total_cost || 0);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const minimumBudgetMessage = useMemo(
    () => `Minimum Budget: $${minimumBudget}`,
    [minimumBudget]
  );

  const totalCostMessage = useMemo(
    () => `Total Cost: $${totalCost}`,
    [totalCost]
  );

  const handleDialogClose = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleBudgetChange = useCallback((e) => {
    setBudget(e.target.value);
  }, []);

  const handleOptimize = useCallback(async () => {
    if (!budget) {
      alert("Please enter a budget before optimizing.");
      return;
    }

    if (parseFloat(budget) < parseFloat(minimumBudget)) {
      alert(`Your budget should be $${minimumBudget} or greater than that`);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await optimizePrescription({
        medications,
        expected_budget: budget,
      });

      if (response?.data === "Already under selected budget!") {
        setOpenDialog(true);
      } else {
        setMedications(response?.data?.medications || []);
        setTotalCost(response?.data?.total_cost || 0);
        setMinimumBudget(response?.data?.minimum_cost || 0);
      }
    } catch (error) {
      console.error("Error optimizing prescription:", error);
      setError("Failed to optimize the prescription. Please try again later.");
    } finally {
      setLoading(false);
      setBudget("");
    }
  }, [budget, minimumBudget, medications]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Prescription Summary
      </Typography>
      <TableContainer component={Paper}>
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Box>
          <TextField
            label="Enter Your Budget"
            type="number"
            value={budget}
            onChange={handleBudgetChange}
            sx={{ width: "200px" }}
          />
          <Typography variant="body2" sx={{ mt: 1, textAlign: "left" }}>
            {minimumBudgetMessage}
          </Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOptimize}
            disabled={loading || !medications.length}
            sx={{ mr: 2 }}
          >
            Optimize Cost
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate("/checkout", {
                state: { medications, total_cost: totalCost },
              })
            }
            disabled={!medications.length}
          >
            Checkout
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mt: 3, textAlign: "right" }}>
        {totalCostMessage}
      </Typography>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Already Under Budget</DialogTitle>
        <DialogContent>
          <Typography>
            Your prescription is already under the selected budget!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PrescriptionSummary;
