const { Router } = require('express');

const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.delete('/:id', salesController.delete);
salesRoute.patch('/changeStatus/:id/', salesController.changeStatus);
salesRoute.patch('/finishOrder/:id', salesController.finishOrder);
salesRoute.post('/', salesController.create);
salesRoute.get('/by-customer/:id', salesController.findByCustomer);
salesRoute.get('/by-seller/:id', salesController.findBySeller);
salesRoute.get('/', salesController.findAll);
salesRoute.get('/:id', salesController.findOne);

module.exports = salesRoute;
