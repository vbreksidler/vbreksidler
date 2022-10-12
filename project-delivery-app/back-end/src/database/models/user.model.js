const User = (sequelize, DataTypes) => {
    const User = sequelize.define('User', 
    {
        name: DataTypes.STRING,        
        email: DataTypes.STRING,        
        password: DataTypes.STRING,        
        role: DataTypes.STRING,        
    },
    {
        tablename: 'users',
        timestamps: false, 
        underscored: true
    }
);  

    User.associate = ({ Sale }) => {
        User.hasMany(Sale, { foreignKey: 'userId' });
        User.hasMany(Sale, { foreignKey: 'sellerId' });
    };
    return User;
};
  
module.exports = User;