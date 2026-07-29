import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth.api";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await login(username, password);

            // เก็บ Token
            localStorage.setItem("token", res.data.token);

            // เก็บข้อมูลผู้ใช้
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/dashboard");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(
                    (err.response?.data as { message?: string })?.message ??
                    "เข้าสู่ระบบไม่สำเร็จ"
                );
            } else {
                setError("เกิดข้อผิดพลาด");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                bgcolor: "#F5F7FA",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card sx={{ width: 420 }}>
                <CardContent>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            textAlign: "center",
                            mb: 4,
                        }}
                    >
                        ClassCheck
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Login"}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}