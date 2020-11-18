const express = require("express")
const server = express()
const Sequelize = require("sequelize")
const sql = new Sequelize("mysql://root@localhost:3306/encuentro50") 

//const validarBody = require("./MIDDLEWARES/validarBody") falta estoo*

// sql.query("select * from usuarios").then(r => {
//     console.log(r)
// }).catch(err =>{
//     console.log(err)
// }) lo que hace es traer todos los usuarios.



//GET USUARIOS
server.get("/usuarios", async (req,res) => {
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

//MIDDLEWARE
server.use(express.json())


//POST LOGIN
server.post("/login", async (req,res)=>{
    const usuario = req.body
    
    // con esto de abajo , las querys, basicamente es el acceso a las tablas que tengo creadas
    // en la base de datos encuentro 50
    try {
        sql.query("SELECT * FROM usuarios WHERE usuario = :nombreUsuario AND contrasenia = :contraseniaUsuario", {
            replacements: {
                nombreUsuario: usuario.usuario, 
                contraseniaUsuario: usuario.contrasenia
            },
            type: sql.QueryTypes.SELECT // si no pongo esto, me trae al body del response, 2 veces el mismo usuario.

        }).then(result => {
            console.log(result)
            //generar token
            res.status(200).json(result)

        })
    } catch (error) {
        console.log(error)
        res.status(404).send("hubo un error")
    }
})


//POST REGISTER
server.post("/register", (req,res)=>{
    const usuario = req.body
    try {
        sql.query(`
            INSERT INTO usuarios (nombre,apellido,usuario,contrasenia)
            VALUES(?,?,?,?)
            `,// lo que se hace con los ? y con el array de abajo es, remplaza los items del [] por los ? de forma lineal
            {
                replacements: [
                    usuario.nombre, 
                    usuario.apellido, 
                    usuario.usuario, 
                    usuario.contrasenia
                ]
                //type: sql.QueryTypes.INSERT  // ESTE ES EL TIPO DE ACCION QUE QUERES QUE REALICE EL CODIGO QUE ESCRIBISTE, insert,select update , saraza
            }
        ).then(result=>{
            console.log(result)
            //token 
            res.status(200).json(result)
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err: error.message})
        
    }
    
})
//estos son verbos en la ruta(las 2 de arriba), esto asi no va para APIREST
// son api de back end fuera de lo que es rest, xq? 
//porque no estan respondiendo a ningun tipo de recursos
//son apís de accion que estan mas vinculadas a un BFF(backend for frontend)
//es un backend que provee acciones o recursos para un frontend en especifico



//GET PUBLICACIONES
server.get("/publicaciones", (req,res)=>{
    try {
        sql.query("SELECT * FROM publicaciones").then(result=>{
            console.log(result)
            res.status(200).json(result[0])
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err: error.message})
        
    }
})


//POST PUBLICACIONES
server.post("/publicaciones", (req,res)=>{
    const publicacion = req.body
    try {
        sql.query(`
            INSERT INTO publicaciones 
            (titulo,contenido,fecha_creacion,id_usuario)
            VALUES(?,?,NOW(),?)
            `,
            {
                replacements: [
                    publicacion.titulo, 
                    publicacion.contenido,
                    publicacion.idUsuario
                ]
            }
        ).then(result=>{
            console.log(result)
            //token 
            res.status(200).json(result)
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err: error.message})
        
    }
})


//PUT PUBLICACIONES
server.put("/publicaciones/:id", (req,res)=>{
    const updateUser = req.body
    const idPublicacion = req.params["id"]
    try {
        sql.query(`
            UPDATE publicaciones 
            SET titulo = ?,
                contenido = ?
            WHERE id = ?
            `,
            {
                replacements: [
                    updateUser.titulo, 
                    updateUser.contenido,
                    idPublicacion
                ]
            }
        ).then(result=>{
            console.log(result)
            //token 
            res.status(200).json(result[0])
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err: error.message})
        
    }
})


//DELETE PUBLICACIONES
server.delete("/publicaciones/:id", (req,res)=>{
    const idPublicacion = req.params["id"]
    try {
        sql.query(`
            DELETE FROM publicaciones 
            WHERE id = ?
            `,
            {
                replacements: [
                    idPublicacion
                ]
            }
        ).then(result=>{
            console.log(result)
            //token 
            res.status(200).json(result[0])
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err: error.message})
        
    }
})

//MIDDLEWARE
server.use((err,req,res,next)=>{
    if(err){
        res.status(500).send("error en el servidor")
    }
    next()
})


server.listen(3000, ()=>{
    console.log("server on")
})