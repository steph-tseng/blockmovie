import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../apiService";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";
import PaginationBar from "../components/PaginationBar";
// import useFetchData from "../components/useFetchData";
const API_KEY = process.env.REACT_APP_API_KEY;

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const handleClick = (movieid) => {
    history.push(`/movies/${movieid}`);
  };

  // useFetchData("upcoming");
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get(
          `/movie/top_rated?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`
        );
        setMovies(res.data.results);
        setTotalPageNum(res.data.total_pages);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(error.message);
      }
    };
    fetchMovies();
  }, [pageNum]);

  return (
    <div
      style={{
        backgroundColor: "#000",
      }}
    >
      {errorMsg && <div>{errorMsg}</div>}
      {movies.length > 0 ? (
        <div>
          <MovieCarousel movies={movies} />
          <ul className="list-unstyled d-flex flex-wrap justify-content-center">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleClick={handleClick}
              />
            ))}
          </ul>
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;
