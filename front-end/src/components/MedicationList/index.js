import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const MedicationList = ({
  medications,
  selectedMedications,
  handleMedicationChange,
}) => {
  return (
    <Grid container spacing={3}>
      {medications.map((med) => (
        <Grid item xs={12} sm={6} key={med.id}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5">{med.name}</Typography>
            <Divider sx={{ my: 2 }} />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Select
                value={selectedMedications[med.id]?.dosage?.id || ""}
                onChange={(e) => {
                  const selectedDosage = med.dosages.find(
                    (dos) => dos.id.toString() === e.target.value
                  );
                  handleMedicationChange(med.id, selectedDosage);
                }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Dosage
                </MenuItem>
                {med.dosages.map((dosage) => (
                  <MenuItem key={dosage.id} value={dosage.id.toString()}>
                    {`${dosage.dosage_amount} - ${dosage.frequency} - $${dosage.unit_price}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedMedications[med.id]?.dosage && (
              <TextField
                label="Custom Duration (in days)"
                size="small"
                fullWidth
                placeholder="Enter duration"
                value={
                  selectedMedications[med.id]?.dosage?.duration?.replace(
                    " days",
                    ""
                  ) || ""
                }
                onChange={(e) => {
                  const value = e.target.value;
                  handleMedicationChange(
                    med.id,
                    selectedMedications[med.id]?.dosage,
                    value
                  );
                }}
              />
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MedicationList;
