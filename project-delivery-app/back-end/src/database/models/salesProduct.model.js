const SalesProduct = (sequelize, DataTypes) => {
    const SalesProduct = sequelize.define('SalesProduct', 
    {
        saleId: {
            type: DataTypes.INTEGER,
            alowNull: false,
            foreignKey: true,
            field: 'sale_id'
        },        
        productId: {
            type: DataTypes.INTEGER,
            alowNull: false,
            foreignKey: true,
            field: 'product_id'
        },        
        quantity: DataTypes.INTEGER,        
    },

    {   
        tableName: 'sales_products',
        timestamps: false, 
        undescored: true,
    }
);  

SalesProduct.associate = ({Sale, Product}) => {
    Sale.belongsToMany(Product, {
        through: SalesProduct,
        foreignKey: 'productId',
    });
    Product.belongsToMany(Sale, {
        through: SalesProduct,
        foreignKey: 'saleId',
    });
    
    SalesProduct.belongsTo(Product, { 
        foreignKey: 'productId', as: 'product'
    });
    SalesProduct.belongsTo(Sale, { 
        foreignKey: 'saleId', as: 'sale' 
    })
};
    return SalesProduct;
};
  
module.exports = SalesProduct;