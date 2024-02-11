import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";

const cookies = new Cookies();

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const resp = await fetch(
        "https://auction-api-hvbv.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await resp.json();

      if (resp.ok) {
        cookies.set("token", data.token, {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
        });
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("The login or password is incorrect!");
    } finally {
      setLoading(false);
    }
  };
  const handleSignUpRedirect = () => {
    navigate("/sign-up");
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}>
        <Typography component="h1" variant="h5" mb={2}>
          Login
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading}
            sx={{ mt: 2 }}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          {error && (
            <Typography variant="body2" color="error" mt={2}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" mt={2}>
            Don't have an account?{" "}
            <Button
              type="button"
              color="primary"
              onClick={handleSignUpRedirect}>
              Sign Up
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};
