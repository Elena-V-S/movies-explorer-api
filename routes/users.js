const router = require('express').Router();
const { validateUser } = require('../middlewares/validations');

const { getProfile, updateProfile } = require('../controllers/users.js');

router.get('/users/me', validateUser, getProfile);

router.patch('/users/me', validateUser, updateProfile);

module.exports = router;
