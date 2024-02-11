import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const role = "ROLE_USER";
  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const resp = await fetch(
        "https://auction-api-hvbv.onrender.com/api/v1/auth/sign-up",
        {
          method: "POST",
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            city,
            role,
          }),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await resp.json();

      if (resp.ok) {
        navigate("/");
      } else {
        setError(data.message || "Sign Up failed");
      }
    } catch (error) {
      setError("Server error happened!");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
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
          Sign Up
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="City"
            label="City"
            autoComplete="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            disabled={loading}
            sx={{ mt: 2 }}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          {error && (
            <Typography variant="body2" color="error" mt={2}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" mt={2}>
            Already have an account?{" "}
            <Button type="button" color="primary" onClick={handleLoginRedirect}>
              Login
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};
