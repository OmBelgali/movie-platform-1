import React from "react";
import styles from "./Sidebar.module.css";
import { Search, Home, Monitor, Tv, TrendingUp, Plus, Shuffle } from "lucide-react";

function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo_container}>
                <span className={styles.brand_initial}>N</span>
            </div>

            <nav className={styles.nav_icons}>
                <div className={styles.icon_group}>
                    <button className={styles.icon_button} title="Search">
                        <Search size={22} />
                    </button>
                    <button className={`${styles.icon_button} ${styles.active}`} title="Home">
                        <Home size={22} />
                    </button>
                    <button className={styles.icon_button} title="Movies">
                        <Monitor size={22} />
                    </button>
                    <button className={styles.icon_button} title="TV Shows">
                        <Tv size={22} />
                    </button>
                    <button className={styles.icon_button} title="Trending">
                        <TrendingUp size={22} />
                    </button>
                </div>

                <div className={styles.bottom_icons}>
                    <button className={styles.icon_button} title="My List">
                        <Plus size={22} />
                    </button>
                    <button className={styles.icon_button} title="Shuffle">
                        <Shuffle size={22} />
                    </button>
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;
