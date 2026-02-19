import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import { User, Lock, ArrowRight } from "lucide-react";

function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                userId,
                password,
            });
            console.log(response.data);
            // In a real app, we'd store a token. Here we'll just redirect.
            window.location.href = "https://movie-platform-1.vercel.app/";
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.glass_card}>
                <div className={styles.login_header}>
                    <h1>Sign In</h1>
                    <p>Stay updated on your favorite movies</p>
                </div>

                {error && <div className={styles.error_msg}>{error}</div>}

                <form onSubmit={handleLogin} className={styles.login_form}>
                    <div className={styles.input_group}>
                        <User className={styles.input_icon} size={20} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.input_group}>
                        <Lock className={styles.input_icon} size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.forgot_password}>
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit" className={styles.login_button} disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                <div className={styles.login_footer}>
                    <p>
                        Don't have an account? <Link to="/register">Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
