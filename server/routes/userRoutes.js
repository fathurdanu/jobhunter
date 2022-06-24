const userRoutes = require('express').Router();
const {UserController} = require('../controllers')
const {authentication} = require('../middlewares/auth')
const upload = require('../middlewares/multer')

userRoutes.post('/login',UserController.login);
userRoutes.post('/register', upload.single('image'), UserController.register);
userRoutes.put('/', authentication, upload.single('image'), UserController.update);
userRoutes.get('/:username', authentication, UserController.getUserByUsername);

module.exports = userRoutes;