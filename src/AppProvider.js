import React, { useContext, useEffect, useState } from 'react';

// const API_URL=`https://api.themoviedb.org/3/movie/157336?api_key=ff2c5fb6a61a873278873ae019066257`  // tmdb api
// const API_URL=`https://api.themoviedb.org/3/movie/157336?api_key=ff2c5fb6a61a873278873ae019066257&append_to_response=videos,images`   //tmdb api
//const API_URL=`https://www.omdbapi.com/?apikey=f0ff6b0d&s=titanic`        // omdb api
export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`        // environmnet variable

const AppContext = React.createContext();

const AppProvider = ( {children} ) => {

    const [ isLoading , setIsLOading ] = useState(true);
    const [ movie , setMOvie ] = useState([]);   // data is array in concole of browser
    const [ isError , setIsError ] = useState({ show:"false" , msg:"" });
    const  [ query, setQuery] = useState('titanic');

      const getMovies =async (url)=>{
        setIsLOading(true);
          try{
                const response =await fetch(url);
                const data=await response.json();
                      // console.log(data);
                
              if(data.Response === "True"){
                setIsLOading('false');
                setIsError({
                  show:false,
                  msg:""
                })
                setMOvie(data.Search);
              }else{
                setIsError({
                  show:true,
                  msg:data.Error
                })
              }
          } catch(error){
               console.log(error);
            }
      }

      useEffect(()=>{
      //01   // fetch(API_URL).then(response => {return response.json()} ).then(data => {console.log(data)} );      
      //02   // getMovies(API_URL);
      //03  // getMovies(`${API_URL}&s=${query}`);

             let timerOut =  setTimeout(() => {        // to get only single response ,instead of getting response at every typing of letter in the search box
                getMovies(`${API_URL}&s=${query}`);
              }, 600);

          return () =>clearTimeout(timerOut);
      },[query]);

      return <AppContext.Provider value={{isLoading,movie,isError,query,setQuery}}>
              {children}
              </AppContext.Provider>;
};



                  // custom built hooks
const useGlobalContext = ()=>{
  return useContext(AppContext);
};

export  { AppContext, AppProvider, useGlobalContext}
