import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import { getGenres } from "./../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    movies: [],
    genres: [],
    sortColumn: {
      path: "title",
      order: "asc",
    },
    searchQuery: "",
    selectedGenre: null,
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }
  deleteHandler = (m) => {
    let { movies } = this.state;
    deleteMovie(m);
    movies = movies.filter((movie) => movie._id !== m._id);
    this.setState({
      movies,
    });
  };
  likeHandler = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  };
  pageChangeHandler = (page) => {
    this.setState({
      currentPage: page,
    });
  };
  genreSelectHandler = (genre) => {
    this.setState({
      currentPage: 1,
      selectedGenre: genre,
      searchQuery: "",
    });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  sortHandler = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      sortColumn,
      selectedGenre,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return {
      movies,
      filtered,
    };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      sortColumn,
      genres,
      selectedGenre,
      searchQuery,
    } = this.state;

    if (count === 0) {
      return <h3>There are no movies in the database</h3>;
    }

    const { filtered, movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="clo-4 m-4">
          <ListGroup
            items={genres}
            onItemSelect={this.genreSelectHandler}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col-6">
          <Link to="/movies/new">
            <button
              className="btn btn-primary m-3"
              allMovies={this.state.movies}
            >
              New Movie
            </button>
          </Link>
          <h3>Showing {filtered.length} movies from the database</h3>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.likeHandler}
            onDelete={this.deleteHandler}
            onSort={this.sortHandler}
          />
          <Pagination
            itemCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.pageChangeHandler}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
