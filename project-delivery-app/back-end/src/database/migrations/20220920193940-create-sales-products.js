'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: {        
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "sales",
          key: "id"
        },
        field: "sale_id"
      },
      productId: {        
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "products",
          key: "id"
        },
        field: "product_id"
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
   });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  }
};
