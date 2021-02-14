const router = require('express').Router(); // создаем роутер
const { validateMovie, validateId } = require('../middlewares/validations');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies.js');

router.get('/movies', getMovies);

router.post('/movies', validateMovie, createMovie);

router.delete('/movies/:movieId', validateId, deleteMovie);

module.exports = router;
