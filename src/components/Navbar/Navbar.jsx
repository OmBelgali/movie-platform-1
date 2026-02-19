import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Search, Bell, User } from "lucide-react";

function Navbar() {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    return (
        <nav className={`${styles.nav} ${show && styles.nav_black}`}>
            <div className={styles.nav_contents}>
                <div className={styles.nav_left}>
                    <img
                        className={styles.nav_logo}
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="Netflix Logo"
                    />
                    <ul className={styles.nav_links}>
                        <li>Home</li>
                        <li>TV Shows</li>
                        <li>Movies</li>
                        <li>New & Popular</li>
                        <li>My List</li>
                    </ul>
                </div>
                <div className={styles.nav_right}>
                    <Search className={styles.nav_icon} size={20} />
                    <Bell className={styles.nav_icon} size={20} />
                    <div className={styles.nav_avatar_container}>
                        <img
                            className={styles.nav_avatar}
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            alt="User Avatar"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
