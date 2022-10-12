const { Router } = require('express');

const userController = require('../controllers/userControler');
const authenticate = require('../middlewares/authMiddleware');

const registerRoute = Router();

registerRoute.post('/admin', authenticate, userController.createUser);

registerRoute.post('/', userController.createUserCustomer);

module.exports = registerRoute;
