import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../apiService";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";
import PaginationBar from "../components/PaginationBar";

// const BACKEND_API = process.env.REACT_APP_BACKEND_API;
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get(
          `/movie/popular?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`
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
      {movies.length > 0 ? <MovieCarousel movies={movies} /> : ""}
      <ul className="list-unstyled d-flex flex-wrap justify-content-center zoom">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} handleClick={handleClick} />
        ))}
      </ul>
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
      />
    </div>
  );
};

export default HomePage;
