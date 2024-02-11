import { useState } from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

const cookies = new Cookies();

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const resp = await fetch("https://auction-api-hvbv.onrender.com/api/v1/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await resp.json();

            if (resp.ok) {
                cookies.set("token", data.token, {expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7))})
                navigate("/");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            setError("Server error happened!");
        } finally {
            setLoading(false);
        }
    };
    const handleSignUpRedirect = () => {
        navigate("/sign-up");
    };

    return (
        <div className="log-in-container">
            <h1>Login</h1>
            <form>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="button" onClick={handleLogin} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <p>Don't have an account? <button type="button" onClick={handleSignUpRedirect}>Sign Up</button></p>
            </form>
        </div>
    );
};