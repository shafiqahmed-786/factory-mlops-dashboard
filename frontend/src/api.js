import axios from "axios";

const API = "https://factory-mlops-dashboard.onrender.com";

export const getMetrics = () =>
  axios.get(`${API}/api/v1/metrics`);

export const createEvent = (payload) =>
  axios.post(`${API}/api/v1/events`, payload);

export const resetSeed = () =>
  axios.post(`${API}/api/v1/reset`);