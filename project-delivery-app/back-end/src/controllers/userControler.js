const userService = require('../services/userService');

const userController = {
    async findAll(_req, res) {
        const userList = await userService.findAll();
        return res.status(200).json(userList);
    },

    async findSellers(_req, res) {
        const sellerList = await userService.findSellers();
        return res.status(200).json(sellerList);
    },

    async createUserCustomer(req, res) {
        await userService.validateRegisterBody(req.body);
        const user = { ...req.body, role: 'customer' };
        const userCreated = await userService.create(user);
        return res.status(201).json(userCreated);
    },
    async createUser(req, res) {
        const user = await userService.validateRegisterBody(req.body);
        const userCreated = await userService.create(user);
        return res.status(201).json(userCreated);
    },
    async findOne(req, res) {
        const { id } = req.params;
        const userCreated = await userService.findOne(+id);
        return res.status(200).json(userCreated);
    },

    async update(req, res) {
        const { id } = req.params;        
        const newUser = await userService.update(+id, req.body);
        return res.status(202).json(newUser);
    },

    async delete(req, res) {
        const { id } = req.params;        
        const deletedProduct = await userService.delete(+id);
        return res.status(202).json({ deletedProduct: deletedProduct.name });
    },
};

module.exports = userController;