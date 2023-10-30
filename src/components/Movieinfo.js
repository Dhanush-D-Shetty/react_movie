import React from "react";
import "./MOvieInfo.css";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../AppProvider";

const Movieinfo = () => {
  const {movie} = useGlobalContext(); // valuse stored in globalcontext present in context Api

  // if(isLoading) {
  //   return (
  //     <div >
  //       <div className="loading">Loading....</div>
  //     </div>
  //   );
  // }

  return (
    <>
      <section className="movie-page">
        <div className="cards-container grid-col">
          {movie.map((EachtMovie) => {
            const { imdbID, Title, Poster } = EachtMovie; //destructing
            const movieName = Title.substring(0, 15);

            return (
              <NavLink to={`movie/${imdbID}`} key={imdbID}>
                <div className="card">
                  <div className="card-info">
                    {/* <h2>{Title}</h2> */}
                    <h2>
                      {movieName.length >= 15 ? `${movieName}...` : movieName}
                    </h2>
                    <img src={Poster} alt={imdbID} />
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>
    </>

    // return (
    //   <>
    //     {movie.map((EachtMovie)=>{
    //           return(
    //               <div>
    //                 <h2>{EachtMovie.Title}</h2>
    //               </div>
    //           );
    //        })}
    //   </>
    // )
  );
};

export default Movieinfo;
