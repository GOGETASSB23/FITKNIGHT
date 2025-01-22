/* eslint-disable no-undef */


import axios from "axios";

// Backend API instance
const backendAPI = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/api/",
  timeout: 10000,
});

backendAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(""); // Replace with your actual token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

backendAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting...");
      // Add redirect logic here if necessary
    }
    return Promise.reject(error);
  }
);

// OpenRouteService API instance
const orsAPI = axios.create({
  baseURL: "https://api.openrouteservice.org/",
  timeout: 10000,
});

orsAPI.interceptors.request.use(
  (config) => {
    const apiKey = process.env.REACT_APP_OPENROUTESERVICE_API_KEY || "YOUR_API_KEY"; // Add your API key here
    if (apiKey) {
      config.headers.Authorization = apiKey;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

orsAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error with OpenRouteService API:", error);
    return Promise.reject(error);
  }
);

export { backendAPI, orsAPI };

