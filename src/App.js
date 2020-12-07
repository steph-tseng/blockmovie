import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import PublicNavbar from "./components/PublicNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import TopRated from "./pages/TopRated";
import ShowingNow from "./pages/ShowingNow";
import UpcomingPage from "./pages/UpcomingPage";
import { useState } from "react";
import api from "./apiService";
import MovieDetails from "./pages/MovieDetails";
import GenrePage from "./pages/GenrePage";
import QueryPage from "./pages/Query";
// import Query from "./pages/Query";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [genreList, setGenreList] = useState([]);
  const history = useHistory();

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(searchInput);

    // setSearchInput("");
  };

  useEffect(() => {
    history.push("/query");
  }, [query, history]);

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const res = await api.get(`/genre/movie/list?language=en-US`);
        // console.log("genre", res.data.genres);
        setGenreList(res.data.genres);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(error.message);
      }
    };
    fetchGenreList();
  }, []);
  // console.log(genreList);

  return (
    // <div style={{ backgroundColor: loading ? "#fff" : "#000" }}>
    <>
      <PublicNavbar
        loading={loading}
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
        genreList={genreList}
      />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/top_rated" component={TopRated} />
        <Route
          exact
          path="/query"
          render={(props) => <QueryPage {...props} query={query} />}
        />
        <Route exact path="/showing_now" component={ShowingNow} />
        <Route exact path="/upcoming" component={UpcomingPage} />
        <Route exact path="/movies/:id" component={MovieDetails} />
        <Route exact path="/genres/:id" component={GenrePage} />
      </Switch>
    </>
    // </div>
  );
}

export default App;
