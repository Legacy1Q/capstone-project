import { useState } from 'react';
import './HorrorMovies2023.css'; 

function HorrorMovies2023() {
    return (
        <div className="HorrorMovies2023">
            <h1>Top Horror Movies of 2023</h1>
            {}
            <article>
                <section>
                    <h2>Movie Title #1</h2>
                    <img src="" alt="Movie Image #1"/>
                    <p>Movie review content...</p>
                </section>

                <section>
                    <h2>Movie Title #2</h2>
                    <img src="" alt="Movie Image #2"/>
                    <p>Movie review content...</p>
                    
                </section>

                <section>
                    <h2>Movie Title #3</h2>
                    <img src="" alt="Movie Image #3"/>
                    <p>Movie review content...</p>
                    
                </section>
            </article>
        </div>
    );
}

export default HorrorMovies2023;
