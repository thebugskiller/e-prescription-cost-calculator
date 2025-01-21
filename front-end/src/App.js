import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MedicationSelector from "./components/MedicationSelector";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MedicationSelector />} />
      </Routes>
    </Router>
  );
}

export default App;
