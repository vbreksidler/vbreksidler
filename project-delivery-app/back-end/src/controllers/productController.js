const productService = require('../services/productService');

const productController = {
    async findAll(_req, res) {
        const productList = await productService.findAll();
        return res.status(200).json(productList);
    },

    async create(req, res) {
        await productService.validateProductsBody(req.body);
        const productCreated = await productService.create(req.body);
        return res.status(201).json(productCreated);
    },

    async findOne(req, res) {
        const { id } = req.params;
        const product = await productService.findOne(+id);
        return res.status(200).json(product);
    },

    async update(req, res) {
        const { id } = req.params;        
        const newProduct = await productService.update(+id, req.body);
        return res.status(202).json(newProduct);
    },

    async delete(req, res) {
        const { id } = req.params;        
        const deletedProduct = await productService.delete(+id);
        return res.status(202).json({ deletedProduct: deletedProduct.name });
    },
    
};

module.exports = productController;