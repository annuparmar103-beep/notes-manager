import axios from "axios"; // axios setup

const API = axios.create({
    baseURL: "http://localhost:3010/api",
    headers: {
        "Content-Type": "application/json",
    }
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default API;