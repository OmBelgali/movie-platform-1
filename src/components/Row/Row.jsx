import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import styles from "./Row.module.css";
import RowItem from "./RowItem";

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className={styles.row}>
            <h2 className={styles.row_title}>{title}</h2>
            <div className={styles.row_posters}>
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <RowItem
                                key={movie.id}
                                movie={movie}
                                isLarge={isLargeRow}
                            />
                        )
                )}
            </div>
        </div>
    );
}

export default Row;
