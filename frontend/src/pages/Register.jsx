import { useState } from "react";
import { register } from "../services/authService";
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Person, Lock, Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register({ name, email, password });
            console.log(response.data);
            toast.success("User registered successfully");
            navigate("/login");
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
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Register</Typography>
                <TextField type="text" label="Username" name="name" value={name} onChange={(e) => setName(e.target.value)} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Person />
                        </InputAdornment>
                    )
                }} />
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
                <Typography variant="body2" sx={{ textAlign: "center" }}>Already have an account? <Link to="/login" >Login</Link></Typography>
            </Paper>
        </Box>
    )
}

export default Register;
