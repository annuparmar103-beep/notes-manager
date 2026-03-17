import { useState } from "react";
import { login } from "../services/authService";
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Person, Lock, Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            toast.success("User logged in successfully");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    return (
        <Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(135deg, #a4d3faff, #e4c3eeff)"
        }}>
            <Paper component="form" onSubmit={handleSubmit} elevation={6} sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 2, width: 400, borderRadius: "10px" }}>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Login</Typography>
                <TextField type="email" label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Email />
                        </InputAdornment>
                    )
                }} />
                <TextField type={showPassword ? "text" : "password"} label="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }} />
                <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>Submit</Button>
                <Typography variant="body2" sx={{ textAlign: "center" }}>Don't have an account? <Link to="/register">Register</Link></Typography>
            </Paper>
        </Box>
    )
}

export default Login;
