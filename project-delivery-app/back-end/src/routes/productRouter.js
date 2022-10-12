const { Router } = require('express');

const productController = require('../controllers/productController');

const productRouter = Router();

productRouter.delete('/:id', productController.delete);
productRouter.put('/:id', productController.update);
productRouter.post('/', productController.create);
productRouter.get('/:id', productController.findOne);
productRouter.get('/', productController.findAll);

module.exports = productRouter;
