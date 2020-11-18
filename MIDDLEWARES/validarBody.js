module.exports = function (server){
    server.use((err,req,res,next)=>{
        if(err){
            throw new Error("Felicidades!Rompiste mi app!")
        }else if(!req.body){
            res.status(401).send("noseque, pero todo mal")
        }

        next()
    })
}