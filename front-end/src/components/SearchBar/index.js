import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ComboBox = ({ medications, onSelectMedication }) => {
  const medicationOptions = medications.map((med) => ({
    id: med.id,
    label: med.name,
  }));

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={medicationOptions}
      sx={{ width: "auto", marginBottom: 3 }}
      renderInput={(params) => (
        <TextField {...params} label="Search Medicine" />
      )}
      onChange={(event, value) => {
        if (value) {
          onSelectMedication(value.id);
        }
      }}
    />
  );
};

export default ComboBox;
