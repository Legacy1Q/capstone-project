// import { useState } from 'react';
import "./HorrorMovie2023.css";
// import Carousel from 'react-bootstrap/Carousel';

function HorrorMovies2023() {
  return (
    <div className="HorrorMovies2023">
      <h1>Top Horror Movies of 2023</h1>
      <p>
        2023 has been a standout year for enthusiasts of horror, and based on
        the critiques on this platform, here are the top-rated horror movies
        from this year. Each of these exceptional horror titles secured a
        minimum of three stars from our dedicated reviewers. Dive into each
        review to discover more about these films and learn where you can stream
        or access them on demand.
      </p>
      <article>
        <section>
          <h2> Talk to Me</h2>
          <img
            src="client-side/imageshorrormovie/700TalkToMe.jpg"
            alt="Movie Image #1"
          />
          <p>
            Plot Synopsis: Talk to Me, a group of friends discovers a chilling
            method to conjure spirits using an embalmed hand. As they get
            increasingly immersed in this newfound thrill, their adventure turns
            sinister. One of them pushes the boundaries too far, awakening an
            ancient, terrifying supernatural force that they had not bargained
            for.
          </p>
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/aLAKJu9aJys?si=FarvaiBm8wVweLSh"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="cast-list">
            <div className="cast-member">
              <img
                src="client-side/imageshorrormovie/2023-04-11_161143_SOPHIEWILDE9.jpg"
                alt="Sophia Wilde"
              />
              <p>SOPHIE WILDE as MIA</p>
            </div>
            <div className="cast-member">
              <img
                src="client-side/imageshorrormovie/Miranda-Otto-Featured.webp"
                alt="MIRANDA OTTO"
              />
              <p>MIRANDA OTTO as SUE</p>
            </div>
            <div className="cast-member">
              <img src="path-to-robert-roe-image.jpg" alt="OTIS DHANJI" />
              <p>OTIS DHANJI as DANIEL</p>
            </div>
            <div className="cast-member">
              <img
                src=" client-side/imageshorrormovie/90dee648-688c-4515-aaef-e95727daf460-cp.jpg"
                alt="ALEXANDRA JENSON"
              />
              <p>ALEXANDRA JENSON as JADE </p>
            </div>
          </div>
          <p>
            Rating: R (For strong/bloody violent content, some sexual material,
            and language throughout)
            <br />
            Genre: Horror, Mystery & Thriller
            <br />
            Original Language: English
            <br />
            Director: Danny Philippou, Michael Philippou
            <br />
            Release Date (Theaters): Jul 28, 2023, Wide
            <br />
            Release Date (Streaming): Sep 12, 2023
            <br />
            Box Office (Gross USA): $46.9M
            <br />
            Runtime: 1h 35m
            <br />
            Distributor: A24
            <br />
            Recommendation Score: [9 out of 10]
          </p>
        </section>

        <section>
          <h2>Movie Title #2</h2>
          <img src="" alt="Movie Image #2" />
          <p>Movie review content...</p>
        </section>

        <section>
          <h2>Movie Title #3</h2>
          <img src="" alt="Movie Image #3" />
          <p>Movie review content...</p>
        </section>
      </article>
    </div>
  );
}

export default HorrorMovies2023;
