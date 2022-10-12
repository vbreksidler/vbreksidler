'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "user_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "seller_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false,
        field: "total_price"
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: "delivery_address"
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "delivery_number"
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "sale_date"
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue:'Pendente'
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
