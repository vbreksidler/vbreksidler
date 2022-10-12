const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', 
    {
      name: DataTypes.STRING(100),        
      price: DataTypes.DECIMAL(4,2),        
      urlImage: {
        type: DataTypes.STRING(200),
        field: 'url_image'
      },       

    },
    {
      tableName: 'products',
      timestamps: false, 
      underscored: true
    }
);  
    Product.associate = ({ SalesProduct }) => {
        Product.hasMany(SalesProduct, { foreignKey: 'productId', as: 'sales' });
    };
    return Product;
};
  
module.exports = Product;