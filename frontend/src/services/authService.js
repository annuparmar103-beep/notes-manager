import API from "./api";

// register user
export const register = async (userData) => {
    return await API.post("/auth/register", userData);
}

// login user
export const login = async (userData) => {
    return await API.post("/auth/login", userData);
}