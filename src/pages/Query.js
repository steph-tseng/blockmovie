import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../apiService";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";
import PaginationBar from "../components/PaginationBar";

// const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const API_KEY = "da56a28f70258600c442ac848facc1e8";

const QueryPage = (query) => {
  const [movies, setMovies] = useState([]);
  // const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  console.log(query);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  // const [searchInput, setSearchInput] = useState("");

  const handleClick = (movieid) => {
    history.push(`/movies/${movieid}`);
  };

  useEffect(() => {
    if (!query) return;
    const fetchQueryRes = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/search/movie?api_key=${API_KEY}&language=en-US&page=${pageNum}&include_adult=false&query=${query.query}`
        );
        console.log(query);
        setMovies(res.data.results);
        setTotalPageNum(res.data.total_pages);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(error.message);
      }
      setLoading(false);
    };
    fetchQueryRes();
  }, [pageNum, query]);

  return (
    <div
      style={{
        backgroundColor: "#000",
      }}
    >
      {errorMsg && <div>{errorMsg}</div>}
      {movies.length > 0 ? <MovieCarousel movies={movies} /> : ""}
      <Container>
        <Row>
          <ul className="list-unstyled d-flex flex-wrap justify-content-center zoom">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleClick={handleClick}
              />
            ))}
          </ul>
        </Row>
        {totalPageNum > 1 && (
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
          />
        )}
        {/* <Footer />  */}
      </Container>
    </div>
  );
};

export default QueryPage;
