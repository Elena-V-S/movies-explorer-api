const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ConflictError = require('../errors/conflict-err');
const {
  messageNotFoundMovie,
  messageForbiddenError,
  // messageSuccessDelete,
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
  const { movieId } = req.body;

  Movie.findOne({ movieId, owner: ownerId })
    .then((data) => {
      if (data === null) {
        Movie.create({ ...req.body, owner: ownerId })
          .then((movie) => res.status(200).send(movie))
          .then((movie) => res.status(200).send(movie))
          .catch(next);
      }
      if (data) {
        throw new ConflictError(messageConflictMovieID);
      }
    })
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
          .then(() => res.status(200).send(movie))
          // .then(() => res.status(200).send(messageSuccessDelete))
          .catch(next);
      } else {
        throw new ForbiddenError(messageForbiddenError);
      }
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
