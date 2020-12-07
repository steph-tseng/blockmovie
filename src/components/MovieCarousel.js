import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";

const MovieCarousel = ({ movies }) => {
  // console.log(movies, "hi");
  // console.log(`https://image.tmdb.org/t/p/w500/${movies[0].backdrop_path}`);
  if (movies.length === 0) return <div>"loading..."</div>;
  return (
    <Carousel>
      {movies[0] && (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/w1280/${movies[0]?.backdrop_path}`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{movies[0]?.title}</h3>
            {/* <p>{movies[0].tagline}</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {movies[1] && (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/w1280/${movies[1]?.backdrop_path}`}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>{movies[1]?.title}</h3>
            {/* <p>{movies[1].tagline}</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {movies[2] && (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/w1280/${movies[2]?.backdrop_path}`}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>{movies[2]?.title}</h3>
            {/* <p>{movies[2].tagline}</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {movies[3] && (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/w1280/${movies[3]?.backdrop_path}`}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>{movies[3]?.title}</h3>
            {/* <p>{movies[2].tagline}</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default MovieCarousel;
