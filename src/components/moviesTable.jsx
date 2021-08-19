import React from "react";

import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

const MoviesTable = ({ movies, onLike, onDelete, onSort, sortColumn }) => {
  const columns = [
    {
      label: "Title",
      path: "title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    // columns , onSort , sortColumn , data
    <Table
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
      data={movies}
    />
  );
};

export default MoviesTable;
