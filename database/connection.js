const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true
      },
  });

sequelize.authenticate()
    .then(()=>{
        console.log('Connection has been established successfully.');    
    })
    .catch((err)=>{
        if (err) throw err;
        console.log('Connected!');    
    });
    
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}