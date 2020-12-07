import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../apiService";
import ReactPlayer from "react-player";
import { PacmanLoader } from "react-spinners";

const API_KEY = "da56a28f70258600c442ac848facc1e8";
// https://api.themoviedb.org/3/movie/550?api_key=da56a28f70258600c442ac848facc1e8&language=en-US

const MovieDetails = () => {
  const params = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [videoInfo, setVideoInfo] = useState("");
  const [recsList, setRecsList] = useState([]);
  const [isBgDark, setIsBgDark] = useState(false);

  const history = useHistory();

  const handleClick = (movieid) => {
    history.push(`/movies/${movieid}`);
  };

  // console.log("LOKK", params.id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const movieRes = await api.get(
          `/movie/${params.id}?api_key=${API_KEY}&language=en-US`
        );
        console.log("movie", movieRes.data);
        setMovie(movieRes.data);

        const videoResult = await api.get(
          `/movie/${params.id}/videos?api_key=${API_KEY}`
        );
        console.log("videos", videoResult.data.results);
        setVideoInfo(videoResult.data.results[0]);

        const recsRes = await api.get(
          `/movie/${params.id}/recommendations?api_key=${API_KEY}&language=en-US`
        );
        console.log("recs", recsRes.data.results);
        setRecsList(recsRes.data.results);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(`FETCH ERROR: ${error.message}`);
      }
      setLoading(false);
    };
    fetchData();
  }, [params]);

  // console.log("details", movie);
  return (
    <div
      // style={{
      //   backgroundColor: isBgDark ? "#000" : "#fff",
      // }}
      style={{
        backgroundColor: "#000",
        color: "#fff",
        height: "vh",
      }}
    >
      <Container className="d-flex text-center justify-content-center">
        {errorMsg && <div>{errorMsg}</div>}
        <br />
        {loading ? (
          <div className="mt-5 pt-5">
            <PacmanLoader color="#FFFF00" size={50} loading={true} />
          </div>
        ) : (
          <div className="d-flex flex-wrap">
            {videoInfo?.key ? (
              <div
                className="player-wrapper"
                style={{ position: "relative", width: "100vw" }}
              >
                <ReactPlayer
                  className="react-player"
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                  }}
                  url={`https://www.youtube.com/watch?v=${videoInfo?.key}`}
                  width="1280px"
                  height="720px"
                  onPlay={() => setIsBgDark(true)}
                  onPause={() => setIsBgDark(false)}
                />
              </div>
            ) : (
              ""
            )}
            <br />
            <Container>
              <Row className="video-info">
                <Col>
                  <h2>{videoInfo?.name}</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>{movie?.tagline}</h3>
                  <p>{movie?.overview}</p>
                </Col>
              </Row>
            </Container>
            <Container className="mt-5">
              <h2 className="recommend">More like this:</h2>
              <ul
                className="list-unstyled d-flex justify-content-center zoom"
                style={{ overflowX: "scroll", overflowY: "hidden" }}
              >
                <br />
                {recsList?.map((movie) => {
                  return (
                    <li>
                      <img
                        className="zoom"
                        height="200px"
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=${API_KEY}`}
                        alt={`${movie.title} Poster`}
                        onClick={() => handleClick(movie.id)}
                      />
                    </li>
                  );
                })}
              </ul>
            </Container>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MovieDetails;
