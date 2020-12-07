import React from "react";
import { CardDeck, Card } from "react-bootstrap";

const API_KEY = "da56a28f70258600c442ac848facc1e8";

// let genreList = {
//   28: "action",
//   16: "animated",
//   99: "documentary",
//   18: "drama",
//   10751: "family",
//   14: "fantasy",
//   36: "history",
//   35: "comedy",
//   10752: "war",
//   80: "crime",
//   10402: "music",
//   9648: "mystery",
//   10749: "romance",
//   878: "sci fi",
//   27: "horror",
//   10770: "TV movie",
//   53: "thriller",
//   37: "western",
//   12: "adventure",
// };

let genreList = {
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ],
};

const MovieCard = ({ movie, handleClick }) => {
  return (
    <CardDeck
      border="info"
      style={{ width: "20rem" }}
      // flex="nowrap"
      className="flex-nowrap"
    >
      <EachMovie key={movie.id} movie={movie} handleClick={handleClick} />
      <div
        className="round-badge"
        style={{ marginTop: "400px", marginLeft: "240px" }}
      >
        {movie.vote_average * 10}%
      </div>
    </CardDeck>
  );
};

const EachMovie = ({ movie, handleClick }) => {
  // console.log(movie);
  if (!movie) return;
  // console.log(movie.genre_ids);

  // let genres = genreList.genres.filter((id) => {
  //   return movie.genre_ids === id;
  // });
  // console.log(genres);

  return (
    <Card
      className="mr-5 mt-5 position-relative"
      as="li"
      border="secondary"
      onClick={() => handleClick(movie.id)}
    >
      <div className="hover-thing position-absolute">
        <div
          className="text-left movie_overview p-3"
          style={{ overflowY: "scroll" }}
        >
          <strong>{movie.title}</strong> <br />
          {movie.overview}
        </div>
      </div>
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=${API_KEY}`}
        alt={`${movie.title} Poster`}
      />

      <Card.Footer className="footer-text">
        <Card.Text>
          <strong>Rating: {movie.vote_average}/10 </strong>
          <small>from {movie.vote_count} votes</small>
        </Card.Text>
        <hr />
        <Card.Text>
          <small>{movie.genre_ids[0]?.name}</small>
        </Card.Text>
        <Card.Text>
          <strong>Released:</strong> {movie.release_date}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default MovieCard;
