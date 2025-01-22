import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/", // Replace with your backend base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Add this function to handle fitness group creation
export const createFitnessGroup = async (token, groupData) => {
    try {
        const response = await api.post("/fitnessgroup/", groupData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the created group's data
    } catch (error) {
        if (error.response) {
            // Backend returned an error response
            console.error("Backend error:", error.response.data);
            throw new Error(error.response.data.detail || "Group creation failed");
        } else {
            // Network or other errors
            console.error("Network error:", error);
            throw new Error("Something went wrong. Please try again later.");
        }
    }
};

export default api;
