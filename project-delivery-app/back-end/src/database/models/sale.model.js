const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', 
  { 
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      foreignKey: true, 
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "seller_id",
      foreignKey: true, 
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      field: "total_price"
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "delivery_address"
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "delivery_number"
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "sale_date"
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue:'Pendente'
    }
  },
  {
    tableName: 'sales',
    timestamps: false, 
    underscored: true
  }
);  

  Sale.associate = ({ User, SalesProduct }) => {
    Sale.belongsTo(User, { foreignKey: 'userId', as: 'user'});
    Sale.belongsTo(User, { foreignKey: 'sellerId', as: 'seller'});
    Sale.hasMany(SalesProduct, { foreignKey: "saleId", as: "products"})
  };
  
  return Sale;
};

module.exports = Sale;