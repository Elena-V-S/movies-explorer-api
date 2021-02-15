const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ConflictError = require('../errors/conflict-err');
const {
  messageNotFoundMovie,
  messageForbiddenError,
  messageSuccessDelete,
  messageConflictMovieID,
} = require('../scripts/errors-massages');

// получаем все сохранённые пользователем фильмы
const getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// создаём фильм с переданными в теле данными
const createMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieID,
  } = req.body;

  Movie.findOne({ movieID, owner: ownerId })
    .then((movie) => {
      if (movie) {
        throw new ConflictError(messageConflictMovieID);
      }
    })
    .catch(next);

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieID,
    owner: ownerId,
  })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

//  удаляет сохранённый фильмы по _id;
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const ownerId = req.user._id;

  Movie.findById({ _id: movieId })
    .orFail(() => new NotFoundError(messageNotFoundMovie))
    .then((movie) => {
      if (movie.owner.toString() === ownerId) {
        Movie.findByIdAndRemove(movieId)
          .then(() => res.status(200).send(messageSuccessDelete))
          .catch(next);
      } else {
        throw new ForbiddenError(messageForbiddenError);
      }
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
