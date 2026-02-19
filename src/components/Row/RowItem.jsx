import React from "react";
import styles from "./Row.module.css";

function RowItem({ movie, isLarge }) {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const imageSize = isLarge ? "w500" : "w500"; // Using w500 for rows is standard

    return (
        <div className={`${styles.row_item} ${isLarge && styles.row_itemLarge}`}>
            <img
                className={`${styles.row_poster} ${isLarge && styles.row_posterLarge}`}
                src={`${baseUrl}${imageSize}${isLarge ? movie.poster_path : movie.backdrop_path
                    }`}
                alt={movie.name}
                loading="lazy"
            />
            <div className={styles.row_item_info}>
                <p className={styles.row_item_title}>
                    {movie?.title || movie?.name || movie?.original_name}
                </p>
            </div>
        </div>
    );
}

export default RowItem;
