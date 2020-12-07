import React from "react";
import { Navbar, Nav, DropdownButton, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../images/blockmovie-logo.png";
import SearchForm from "./SearchForm";

const PublicNavbar = ({
  loading,
  searchInput,
  handleSearchChange,
  handleSubmit,
  genreList,
}) => {
  return (
    <Navbar className="navbar-dark" bg="dark" expand="lg">
      <Navbar.Brand>
        <Nav.Link as={NavLink} to="/" className="mr-2">
          <img src={logo} alt="CoderSchool" width="100px" />
        </Nav.Link>
      </Navbar.Brand>
      <Nav className="mr-auto nav_link flex-row">
        <Nav.Link as={NavLink} to="/" className="mr-2">
          Popular
        </Nav.Link>
        <Nav.Link as={NavLink} to="/top_rated" className="mr-2">
          Top Rated
        </Nav.Link>
        <Nav.Link as={NavLink} to="/showing_now">
          Showing Now
        </Nav.Link>
        <Nav.Link as={NavLink} to="/upcoming">
          Upcoming
        </Nav.Link>
        <DropdownButton id="dropdown-button" title="Genres" className="mt-1">
          {genreList?.map((genre) => {
            return (
              <Dropdown.Item href={`/genres/${genre.id}`} id={genre.id}>
                {genre.name}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Nav>
      <Nav className="d-flex justify-content-end">
        <Nav.Item>
          <SearchForm
            loading={loading}
            searchInput={searchInput}
            handleSearchChange={handleSearchChange}
            handleSubmit={handleSubmit}
          />
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
