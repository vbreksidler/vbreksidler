const Joi = require('joi');
const { Product } = require('../database/models');

const userService = {
    async validateProductsBody(body) {
        const schema = Joi.object({          
          name: Joi.string().required(),
          price: Joi.string().required(), 
          urlImage: Joi.string().required(),
        });
    
        const { error } = schema.validate(body);
        console.log(error);
        if (error) { throw new Error(error.message, { cause: 400 }); }
    },

    async findAll() {
        const productList = await Product.findAll();
        return productList;
    },

    async create(body) {
        const createdProduct = await Product.create(body);
        if (createdProduct) return createdProduct;
    },

    async findOne(id) {
        const product = await Product.findByPk(id);
        if (product) return product;
        throw new Error('Not Found', { cause: 404 });
    },

    async delete(id) {
        const product = await this.findOne(id);

        if (product) {
            await Product.destroy({ where: { id } });
            return product;
        }
    },

    async update(id, body) {
        const product = await this.findOne(id, { raw: true });
        const updatedProduct = { ...product.dataValues, ...body };
        const { name, urlImage, price } = updatedProduct;

        if (product) {
            await Product.update({ name, price, urlImage }, { where: { id } });
            return updatedProduct;
        }
    },
};

module.exports = userService;