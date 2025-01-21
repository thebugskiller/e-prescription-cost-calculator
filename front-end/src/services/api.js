import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const fetchMedications = () => API.get("/medications");
export const createPrescription = (data) => API.post("/prescriptions", data);
export const getPrescriptionCost = (data) =>
  API.post("/prescriptions/calculate_cost", data);
export const optimizePrescription = (data) =>
  API.post("/prescriptions/optimize_cost", data);
