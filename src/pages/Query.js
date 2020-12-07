import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import api from "../apiService";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";
import PaginationBar from "../components/PaginationBar";

const QueryPage = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  console.log("=".repeat(20), query);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleClick = (movieid) => {
    history.push(`/movies/${movieid}`);
  };

  useEffect(() => {
    if (!query) return;
    const fetchQueryRes = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/search/movie?language=en-US&page=${pageNum}&include_adult=false&query=${query}`
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
      {loading ? (
        <div className="mt-5 pt-5">
          <PacmanLoader color="#FFFF00" size={50} loading={true} />
        </div>
      ) : (
        <>
          {movies.length > 0 ? <MovieCarousel movies={movies} /> : ""}

          <ul className="list-unstyled d-flex flex-wrap justify-content-center zoom">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleClick={handleClick}
              />
            ))}
          </ul>
        </>
      )}

      {totalPageNum > 1 && (
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
        />
      )}
    </div>
  );
};

export default QueryPage;
