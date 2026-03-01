import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getMetrics = () =>
  axios.get(`${API}/api/v1/metrics`);

export const createEvent = (payload) =>
  axios.post(`${API}/api/v1/events`, payload);

export const resetSeed = () =>
  axios.post(`${API}/api/v1/reset`);