import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../AppProvider";
import "./singlemovie.css";

const SingleMovie = () => {
  const { id } = useParams();
  // console.log(id);

  const [isLoading, setIsLOading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMovies = async (url) => {
    setIsLOading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.Response === "True") {
        setIsLOading("false");
        setMovie(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`); // fetching single movie data based on id
    }, 500);

    return () => clearTimeout(timerOut);
  }, [id]);

  // if(isLoading) {
  //   return (
  //     <div className="movie-section">
  //       <div className="loading" >Loading... lllll.</div>
  //     </div>
  //   );
  // }

  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          <div className="move-poster">
            <img src={movie.Poster} alt="" />
          </div>
          <div className="card-content">
            <div className="title">
              <span>{movie.Title}</span>{" "}
              <span className="year">({movie.Year})</span>
            </div>
            <div className="release">
              <span> {movie.Released} ||</span> <span>{movie.Genre} ||</span>{" "}
              <span>{movie.Runtime}</span>
            </div>
            <div className="actor">
              <p>
                <span className="heading">Actors :</span> <br />{" "}
                <span> {movie.Actors} </span>
              </p>
              <p>
                {" "}
                <span className="heading">Director :</span> <br />{" "}
                <span>{movie.Director}</span>
              </p>
            </div>
            <div className="overview">
              <p className="heading">Overview :</p>
              <p className="overview-data">{movie.Plot}</p>
            </div>
            
            <div className="final">
              <div>
                <span className="heading">imdb rating:</span><div className="imdb">{movie.imdbRating}</div>
              </div>
             
              <div>
                <p className="card-text"><span className="heading">lang :</span>{movie.Language}</p>
                <p className="card-text"><span className="heading">Country :</span> {movie.Country}</p>
              </div>
            </div>
            <div className="btn">
              <Link to="/"> Go Back</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleMovie;
