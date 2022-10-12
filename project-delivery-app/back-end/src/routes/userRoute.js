const { Router } = require('express');

const userController = require('../controllers/userControler');

const userRoute = Router();

userRoute.delete('/:id', userController.delete);
userRoute.put('/:id', userController.update);
userRoute.get('/sellers', userController.findSellers);
userRoute.get('/:id', userController.findOne);
userRoute.get('/', userController.findAll);

module.exports = userRoute;
