import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";
import { User, Mail, Phone, Lock, UserCheck, ArrowRight } from "lucide-react";

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
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
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
                {/* Left Side: Illustration & Branding */}
                <div className={styles.left_side}>
                    <div className={styles.brand}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                            alt="Netflix Logo"
                            className={styles.logo}
                        />
                    </div>
                    <div className={styles.illustration_container}>
                        <div className={styles.welcome_text}>
                            <h2>Welcome to Netflix</h2>
                            <p>Explore thousands of movies and TV shows at your fingertips.</p>
                        </div>
                    </div>
                    <div className={styles.social_hint}>
                        <p>Already a member?</p>
                        <Link to="/login" className={styles.signin_btn}>Sign In</Link>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className={styles.right_side}>
                    <div className={styles.form_header}>
                        <h1>Create Account</h1>
                        <p>Start your cinematic journey with us</p>
                    </div>

                    {error && <div className={styles.error_msg}>{error}</div>}

                    <form onSubmit={handleRegister} className={styles.register_form}>
                        <div className={styles.input_grid}>
                            <div className={styles.input_group}>
                                <UserCheck className={styles.input_icon} size={20} />
                                <input
                                    type="text"
                                    name="userId"
                                    placeholder="User ID (e.g. kodom01)"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.input_group}>
                                <User className={styles.input_icon} size={20} />
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
                                <Mail className={styles.input_icon} size={20} />
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
                                <Phone className={styles.input_icon} size={20} />
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
                                <Lock className={styles.input_icon} size={20} />
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
                            {loading ? "Creating Account..." : "Create Account"}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className={styles.social_divider}>
                        <span>or sign up with</span>
                    </div>

                    <div className={styles.social_icons}>
                        <button className={styles.social_btn}>G</button>
                        <button className={styles.social_btn}>F</button>
                        <button className={styles.social_btn}>A</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
