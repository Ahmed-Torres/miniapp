const Sequelize = require("sequelize")

const sql = new Sequelize("mysql://root@localhost:3306/encuentro50") 


module.exports = sql

