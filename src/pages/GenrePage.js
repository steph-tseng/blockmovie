import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../apiService";
import PaginationBar from "../components/PaginationBar";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";
import { PacmanLoader } from "react-spinners";

const API_KEY = "da56a28f70258600c442ac848facc1e8";
// https://api.themoviedb.org/3/movie/550?api_key=da56a28f70258600c442ac848facc1e8&language=en-US

const MovieDetails = () => {
  const params = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);

  const history = useHistory();

  const handleClick = (movieid) => {
    history.push(`/movies/${movieid}`);
  };
  // https://api.themoviedb.org/3/discover/movie?api_key=da56a28f70258600c442ac848facc1e8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27
  // console.log("LOKK", params.id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/discover/movie?sort_by=popularity.desc&language=en-US&page=${pageNum}&with_genres=${params.id}`
        );
        console.log("data", res.data);
        // console.log("genre", res.data.results);
        setMovies(res.data.results);
        setTotalPageNum(res.data.total_pages);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(`FETCH ERROR: ${error.message}`);
      }
      setLoading(false);
    };
    fetchData();
  }, [pageNum, params]);

  // console.log("details", movie);
  return (
    <div
      style={{
        backgroundColor: "#000",
      }}
    >
      {errorMsg && <div>{errorMsg}</div>}
      {movies?.length > 0 ? <MovieCarousel movies={movies} /> : ""}
      {loading ? (
        <div className="mt-5 pt-5 justify-content-center">
          <PacmanLoader color="#FFFF00" size={50} loading={true} />
        </div>
      ) : (
        <div>
          <ul className="list-unstyled d-flex flex-wrap justify-content-center zoom">
            {movies?.map((movie) => (
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
      )}
    </div>
  );
};

export default MovieDetails;
