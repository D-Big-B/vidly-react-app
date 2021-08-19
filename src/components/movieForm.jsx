import Joi from "joi-browser";
import React from "react";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
import { getGenres } from "./../services/fakeGenreService";
import Forms from "./common/forms";

class MovieForm extends Forms {
  state = {
    data: {
      title: "",
      noInStock: "",
      rate: "",
    },
    genres: ["", ...getGenres()],
    selectedGenre: "",
    errors: {},
  };

  componentDidMount() {
    const data = { ...this.state.data };
    let selectedGenre = this.state.selectedGenre;
    const movie = getMovie(this.props.match.params.movie_id);
    if (movie) {
      data.title = movie.title;
      data.noInStock = movie.numberInStock;
      data.rate = movie.dailyRentalRate;

      selectedGenre = movie.genre.name;

      this.setState({ data, selectedGenre });
    }
  }

  schema = {
    title: Joi.string().required().label("Title"),
    noInStock: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Number In Stock"),
    rate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  doSubmit = () => {
    // Call the server
    const { title, noInStock, rate } = this.state.data;
    const { selectedGenre, genres } = this.state;
    const movie = {
      _id: this.props.match.params.movie_id,
      title: title,
      genre: genres.find((genre) => genre.name === selectedGenre),
      numberInStock: noInStock,
      dailyRentalRate: rate,
    };

    saveMovie(movie);
    this.props.history.goBack();
  };

  handleListChange = (event) => {
    this.setState({ selectedGenre: event.target.value });
  };
  handleRoute = () => {
    if (
      getMovie(this.props.match.params.movie_id) === undefined ||
      this.props.match.params.movie_id === "new"
    ) {
      console.log("right path");
      this.props.history.replace("/not-found");
    }
  };

  render() {
    return (
      <div>
        {this.handleRoute()}
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          Genre
          <div className="input-group mb-3">
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onChange={this.handleListChange}
              value={this.state.selectedGenre}
            >
              {this.state.genres.map((genre) => (
                <option key={genre._id || "new"} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          {this.renderInput("noInStock", "Number In Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
