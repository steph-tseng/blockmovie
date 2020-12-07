import React, { useEffect, useState } from "react";
import api from "../apiService";

const useFetchData = (category) => {
  const API_KEY = "da56a28f70258600c442ac848facc1e8";
  const [movies, setMovies] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get(
          `/movie/${category}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`
        );
        console.log("test", res.data.results);
        setMovies(res.data.results);
        setTotalPageNum(res.data.total_pages);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(error.message);
      }
    };
    fetchMovies();
  }, [category, pageNum]);

  return { movies, pageNum, totalPageNum, errorMsg };
};

export default useFetchData;
