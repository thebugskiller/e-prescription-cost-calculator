import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { fetchMedications, getPrescriptionCost } from "../../services/api";
import { useNavigate } from "react-router-dom";
import ComboBox from "../SearchBar";
import MedicationList from "../MedicationList";

const MedicationSelector = () => {
  const [medications, setMedications] = useState([]);
  const [selectedMedications, setSelectedMedications] = useState({});
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchMedications();
        setMedications(response.data || []);
      } catch (err) {
        console.error("Failed to fetch medications:", err);
        setError("Unable to fetch medications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectMedication = (medicationId) => {
    const medication = medications.find((med) => med.id === medicationId);
    if (
      medication &&
      !filteredMedications.some((med) => med.id === medicationId)
    ) {
      setFilteredMedications((prev) => [medication, ...prev]);
    }
  };

  const handleMedicationChange = useCallback(
    (medicationId, dosage, customDuration = null) => {
      const formattedDuration =
        customDuration && !customDuration.endsWith(" days")
          ? `${customDuration} days`
          : customDuration || dosage.default_duration;

      setSelectedMedications((prev) => ({
        ...prev,
        [medicationId]: {
          id: medicationId,
          name: medications.find((med) => med.id === medicationId)?.name,
          dosage: {
            id: dosage.id,
            dosage_amount: dosage.dosage_amount,
            frequency: dosage.frequency,
            duration: formattedDuration,
            unit_price: dosage.unit_price,
          },
        },
      }));
    },
    [medications]
  );

  const handleSubmit = async () => {
    const formattedMedications = Object.keys(selectedMedications).map(
      (medicationId) => {
        const selected = selectedMedications[medicationId];
        return {
          id: selected.id.toString(),
          dosage: {
            id: selected.dosage.id.toString(),
            duration: selected.dosage.duration,
          },
        };
      }
    );

    if (formattedMedications.length === 0) {
      alert("Please select at least one medication.");
      return;
    }

    try {
      const response = await getPrescriptionCost({
        medications: formattedMedications,
      });
      navigate("/summary", {
        state: {
          medications: response?.data?.medications,
          total_cost: response?.data?.total_cost,
          minimum_budget: response?.data?.minimum_cost,
        },
      });
    } catch (error) {
      console.error("Failed to create prescription:", error);
      alert("Failed to submit prescription. Please try again later.");
    }
  };

  const isSubmitDisabled = useMemo(
    () => Object.keys(selectedMedications).length === 0,
    [selectedMedications]
  );

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
    <Box sx={{ maxWidth: 1000, margin: "auto", padding: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Select Medications and Dosages
      </Typography>
      <ComboBox
        medications={medications}
        onSelectMedication={handleSelectMedication}
      />
      <MedicationList
        medications={filteredMedications}
        selectedMedications={selectedMedications}
        handleMedicationChange={handleMedicationChange}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 3, marginBottom: 3 }}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit Prescription
      </Button>
    </Box>
  );
};

export default MedicationSelector;
