var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var Cliente = require("../models/Cliente");

exports.register = async (req,res) => {


    //Creates an encrypted password
    var hashedPassword = bcrypt.hashSync(req.body.password,8);
    var newCliente = new Cliente({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        usuario: req.body.usuario,
        correo:req.body.correo,
        password: hashedPassword
    })

    try{
        var succ = await newCliente.save((err,cliente)=>{
            //Sends an status of error if something bad happens
            if (err) return res.code(500).send("There was a problem regestrying the cliente")
            //Creates a JWT, It allows the user to make request to the API
            var token = jwt.sign({id: cliente._id},config.secret,{
                //Expires in the asigned time
                expiresIn:86400
            })

            res.code(200).send({ auth: true, token: token })

           


        })
         
        return succ
    }catch(err){
        throw new Error(err.message)
    }

}

exports.sign = async (req,res) => {
    
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log(token)
    res.status(200).send(token)
    // var token = req.headers['x-access-token'];
    // if(!token) return res.status(401).send({auth:false,message:'No token provided.'})

    // jwt.verify(token, config.secret,function(err,decoded){
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    //     Cliente.findById(decoded._id,function(err,user){
    //         if (err) return res.status(500).send("There was a problem finding the user.");
    //         if (!user) return res.status(404).send("No user found.");
            
    //         res.status(200).send(user);
    //     })
    // })
} 

// exports.login = async(req,res){
//         Cliente.findOne({})
// }



//https://stackoverflow.com/questions/30089604/jwt-whats-a-good-secret-key-and-how-to-store-it-in-an-node-js-express-app#30090120