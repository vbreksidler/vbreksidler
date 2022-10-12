const Joi = require('joi');
const md5 = require('md5');
const { User } = require('../database/models');

const userService = {
    async validateRegisterBody(body) {
        const schema = Joi.object({
            name: Joi.string().min(12).required(),
            email: Joi.string().email().required(),
            role: Joi.string().default('customer'),
            password: Joi.string().min(6).required(),
          });
    
        const { error, value } = schema.validate(body);
        if (error) { throw new Error(error.message, { cause: 400 }); }
        return value;
    },

    async findAll() {
        const userList = await User.findAll();
        return userList;
    },

    async create(user) {
        const { password, name, email, role } = user;
        const hashedPassword = md5(password); 
        const findExist = await User.findOne({ where: { email } });
        if (findExist) throw new Error('Usuario ja existente', { cause: 409 });
        const createdUser = await User.create({ name, email, role, password: hashedPassword });
        if (createdUser) return createdUser;
    },

    async findOne(id) {
        const createdUser = await User.findByPk(id);
        if (createdUser) return createdUser;
        throw new Error('Not Found', { cause: 404 });
    },

    async findSellers() {
        const sellerList = await User.findAll({ where: { role: 'seller' } });
        return sellerList;
    },

    async delete(id) {
        const product = await this.findOne(id);

        if (product) {
            await User.destroy({ where: { id } });
            return product;
        }
    },

    async update(id, body) {
        const user = await this.findOne(id, { raw: true });
        const updatedUser = { ...user.dataValues, ...body };
        const { name, email, role, password } = updatedUser;
        
        if (body.password && user) {
            const hashedPassword = md5(body.password);
            updatedUser.password = hashedPassword;
            await User.update({ name, email, role, password: hashedPassword }, { where: { id } });
            return updatedUser;
        }

        if (user) {
            await User.update({ name, email, role, password }, { where: { id } });
            return updatedUser;
        }
    },
};

module.exports = userService;