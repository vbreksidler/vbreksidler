const Joi = require('joi');
const md5 = require('md5');
const { createToken } = require('../utils/token');
const { User } = require('../database/models');

const loginService = {
    async validateLoginBody(body) {
        const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
        });
    
        const { error } = schema.validate(body);
        if (error) { throw new Error(error.message, { cause: 400 }); }
    },

    async login(user) {
        const userInfo = await User.findOne({ where: { email: user.email } });
        if (!userInfo) {
            throw new Error('Not Found', { cause: 404 });
        }
        const userHashedPassword = md5(user.password);
        const token = await createToken(userInfo);
        if (userInfo.password === userHashedPassword) {
            return {
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                role: userInfo.role,
                token,
            };
        }
        throw new Error('Unauthorized', { cause: 401 });
    },
};

module.exports = loginService;