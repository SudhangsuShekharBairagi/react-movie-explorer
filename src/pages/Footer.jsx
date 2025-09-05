
import React from "react";
import Style from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={Style.footer}>
            <div className={Style.container}>
                <p>🎬 Movie Search App &copy; {new Date().getFullYear()}</p>
                <p>
                    Powered by{" "}
                    <a
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        TMDB API
                    </a>
                </p>
            </div>
        </footer>
    );
}
