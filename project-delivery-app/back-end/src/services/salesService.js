const Joi = require('joi');
const { sequelize } = require('../database/models');
const { Sale, User, SalesProduct, Product } = require('../database/models');
// const getTotalPrice = require('../utils/getTotalPrice');
// const saleStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];

const salesService = {
    async validateSaleBody(body) {
        const schema = Joi.object({
          userId: Joi.number().required(),
          sellerId: Joi.number().required(),
          totalPrice: Joi.number().required(),
          deliveryAddress: Joi.string().required(),
          deliveryNumber: Joi.number().required(),
          products: Joi.array().items({
            productId: Joi.number().required(),
            quantity: Joi.number().required(),
        }),
    });
    
        const { error } = schema.validate(body);

        if (error) { throw new Error(error.message, { cause: 400 }); }
    },

    async findAll() {
        const sales = await Sale.findAll({
            attributes: { exclude: ['sellerId'] }, 
            include: [{
                model: SalesProduct,
                as: 'products',                
                attributes: { exclude: ['saleId', 'productId'] },                            
                include: [{
                    model: Product,
                    as: 'product',
                }],
            }],
        });

        return sales;
    },
    async findBySeller(sellerId) {
        const salesByRole = await Sale.findAll({ where: { sellerId },
        attributes: { exclude: ['sellerId'] }, 
        include: [{
            model: SalesProduct,
            as: 'products',                
            attributes: { exclude: ['saleId', 'productId'] },                            
            include: [{
                model: Product,
                as: 'product',
            }],
        }] });

        return salesByRole;
    },

    async findByCustomer(userId) {
        const salesByRole = await Sale.findAll({ where: { userId },
        include: [{
            model: SalesProduct,
            as: 'products',                
            attributes: { exclude: ['saleId', 'productId'] },                            
            include: [{
                model: Product,
                as: 'product',
            }],
        }] });

        return salesByRole;
    },

    async checkCustomer(id) {
        const customer = await User.findByPk(+id);
        if (!customer) throw new Error('Not Found', { cause: 404 });
        if (customer.dataValues.role !== 'customer') { 
            throw new Error('Forneça a id de um cliente!', { cause: 401 }); 
        }
    },

    async checkSeller(id) {
        const seller = await User.findByPk(+id);
        if (!seller) throw new Error('Not Found', { cause: 404 });
        if (seller.dataValues.role !== 'seller') { 
            throw new Error('Forneça a id de um vendedor!', { cause: 401 }); 
        }
    },

    async create(body) {
        const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = body;
        await this.checkCustomer(userId);
        await this.checkSeller(sellerId);
        // const totalPrice = getTotalPrice(products);
        const createdSale = await sequelize.transaction(async (t) => {
            const sale = await Sale.create({
                userId,
                sellerId,
                totalPrice,
                deliveryAddress,
                deliveryNumber,
            }, { transaction: t });

            await SalesProduct.bulkCreate(products.map(({ productId, quantity }) => ({ 
                saleId: sale.id, productId, quantity, 
            })), { transaction: t });
            return sale;
        });
        return createdSale;
    },

    async findOne(id) {
        const sale = await Sale.findByPk(id, {
            include: [{
                model: SalesProduct,
                as: 'products',                
                attributes: { exclude: ['saleId', 'productId'] },                            
                include: [{
                    model: Product,
                    as: 'product',
                }],
            }],
        });
        if (!sale) throw new Error('Not Found', { cause: 404 });
        return sale;
    },
    
    async changeStatus(saleId, status) {
        // const { role, id } = await readToken(token);
        // const sale = await this.findOne(id);
        // if (sale.sellerId !== id) throw new Error('Not your order', { cause: 409 });
        // if (role !== 'seller') throw new Error('Unauthorized', { cause: 401 });

        const newStatus = ['Preparando', 'Em Trânsito'];

        if (status === '1' || status === '0') {
            const updatedSale = await Sale.update({ status: newStatus[+status] }, { 
                where: { id: saleId }, 
            });
            return updatedSale;
        }
    },

    async finishOrder(saleId) {
        // const { role, id } = await readToken(token);
        // const sale = await this.findOne(id);
        // if (sale.userId !== id) throw new Error('Not your order', { cause: 409 });
        // if (role !== 'customer') throw new Error('Unauthorized', { cause: 401 });
        
        const updatedSale = await Sale.update({ status: 'Entregue' }, { 
            where: { id: saleId }, 
        });
        return updatedSale;
    },
    
    async delete(id) {
        const sale = await this.findOne(id);
       
        await Sale.destroy({ where: { id } });
        return sale;
    },
};

module.exports = salesService;
