import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
    const [formData, setFormData] = useState({
        userId: "",
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "");
            await axios.post(`${apiUrl}/api/register`, formData);
            alert("Registration successful! Redirecting to login...");
            navigate("/login");
        } catch (err) {
            console.error("Registration Error Detail:", err);
            setError(err.response?.data?.error || "Registration failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.register_container}>
            <div className={styles.register_card}>
                <div className={styles.form_header}>
                    <h1>Register</h1>
                </div>

                {error && <div className={styles.error_msg}>{error}</div>}

                <form onSubmit={handleRegister} className={styles.register_form}>
                    <div className={styles.input_grid}>
                        <div className={styles.input_group}>
                            <input
                                type="text"
                                name="userId"
                                placeholder="User ID"
                                value={formData.userId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.input_group}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.input_group}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.input_group}>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.input_group_full}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.register_button} disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <div className={styles.social_hint}>
                    <p>
                        Already a member? <Link to="/login">Sign In.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
