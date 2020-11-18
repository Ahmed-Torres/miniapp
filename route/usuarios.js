const express = require("express");
const route = express.Router();
const sql = require("../connection")


//GET USUARIOS
route.get("/", async (req,res) => {
    try {
        sql.query("SELECT * FROM usuarios",
            {type: sql.QueryTypes.SELECT} 
            // O HACEMOS ESTO, O EN VEZ DE USAR UNA LINEA AL PEDO, AL console.log(result[0]) le agregamos eso nada mas, el [0]
        ).then(result => {
            console.log(result)
            res.status(200).json(result)
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err: error.message})
    }
})

module.exports = route; 