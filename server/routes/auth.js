const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

const authController = require('../controllers/auth');

router.post(
	'/signup',
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email.')
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then((userDoc) => {
					if (userDoc) {
						return Promise.reject('E-Mail address already exists');
					}
				});
			})
			.normalizeEmail(),
		body('password').trim().isLength({ min: 8 }),
		body('firstName').trim().not().isEmpty(),
		body('lastName').trim().not().isEmpty(),
	],
	authController.signup
);

router.post('/login', authController.login);
router.get('/me', isAuth, authController.loadUser);

module.exports = router;
