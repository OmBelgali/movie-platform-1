import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import requests from "../../api/requests";
import styles from "./Banner.module.css";
import { Play, Info } from "lucide-react";

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }

    const backgroundImage = movie?.backdrop_path
        ? `url("${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.backdrop_path}")`
        : "";

    return (
        <header
            className={styles.banner}
            style={{
                backgroundSize: "cover",
                backgroundImage: backgroundImage,
                backgroundPosition: "center center",
            }}
        >
            <div className={styles.banner_contents}>
                <div className={styles.banner_series_label}>
                    <span className={styles.n_initial}>N</span>
                    <span className={styles.series_text}>SERIES</span>
                </div>
                <h1 className={styles.banner_title}>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className={styles.banner_metadata}>
                    <div className={styles.imdb_tag}>
                        <span className={styles.imdb_badge}>IMDb</span>
                        <span className={styles.imdb_rating}>8.8/10</span>
                    </div>
                    <span className={styles.stream_count}>2B+ Streams</span>
                </div>

                <div className={styles.banner_buttons}>
                    <button className={styles.banner_button_play}>
                        <Play size={20} fill="currentColor" />
                        <span>Play</span>
                    </button>
                    <button className={styles.banner_button_trailer}>
                        <span>Watch Trailer</span>
                    </button>
                </div>
                <h1 className={styles.banner_description}>
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className={styles.banner_fadeBottom} />
        </header>
    );
}

export default Banner;
