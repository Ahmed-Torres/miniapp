const express = require("express")
const server = express()
const sql = require("./connection")
const routeUsuarios = require("./route/usuarios")




/**
 * ENDPOINTS A CREAR Y CONECTAR CON LA BASE DE DATOS DE CANCIONES.
 * - Agregar una canción
- Modificar una canción por ID
- Eliminar una canción por su ID
- Retornar todas las canciones
- Buscar canciones por su nombre

 */
const Sequelize = require("sequelize")
const dbBAC = new Sequelize("mysql://root@localhost:3306/encuentro50ejari")


//middle
let validarBody = async(err,req,res,next)=>{
    if (err) {
        throw new Error("ocurrio un error al recibir el body")
    }else if(!req.body){
        res.status(400).send("te olvidaste del body")
    }else if(body){
        next()
    }
}

 //post de cancion: nombre duracion album banda fecha_publicacion
server.post("/canciones", validarBody, (req,res)=>{
    let body = req.body
    try {
        dbBAC.query(`
            INSERT INTO canciones (nombre, duracion, album, banda, fecha_publicacion)
            VALUES(?,?,?,?,?)
            `,
            {
                replacements: [
                    body.nombre,
                    body.duracion,
                    body.album,
                    body.banda,
                    body.fecha_publicacion,
                ]
            }
        ).then(result=>{
            console.log(result[0])
            res.status(200).json(result[0])
        })
    } catch (error) {
        console.lor(error.message)
        res.status(500).json({err: error.message})
    }
})

//- Modificar una canción por ID
server.put("/canciones/:id", (req,res)=>{
    const body = req.body
    const idCancion = req.params["id"]
    try {
        dbBAC.query(`
            UPDATE canciones
                SET nombre = ?,
            WHERE id = ?
            `,
            {
                replacements: [
                    body.nombre,
                    idCancion
                ]
            }).then(result=>{
                console.log(result[0])
                res.status(200).json(result[0])
            })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err:error.message})
        
    }
})
// - Retornar todas las canciones
server.get("/canciones", (req,res)=>{
    try {
        dbBAC.query(`SELECT * FROM canciones`).then(result=>{
            console.log(result[0])
            res.status(200).json(result[0])
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({err:error.message})
    }
})

//MIDDLEWARE
server.use(express.json())

//GET USUARIOS
server.use("/usuarios", routeUsuarios)

//POST LOGIN
server.post("/login", async (req,res)=>{
    const usuario = req.body
    try {
        sql.query("SELECT * FROM usuarios WHERE usuario = :nombreUsuario AND contrasenia = :contraseniaUsuario", {
            replacements: {
                nombreUsuario: usuario.usuario, 
                contraseniaUsuario: usuario.contrasenia
            }
        }).then(result => {
            console.log(result[0])
            //generar token
            res.status(200).json(result[0])
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
            `,
            {
                replacements: [
                    usuario.nombre, 
                    usuario.apellido, 
                    usuario.usuario, 
                    usuario.contrasenia
                ]
            }
        ).then(result=>{
            console.log(result[0])
            //token 
            res.status(200).json(result[0])
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