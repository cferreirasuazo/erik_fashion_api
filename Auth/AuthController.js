var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var Cliente = require("../models/Cliente");

exports.register = async (req, res) => {


    //Creates an encrypted password
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var newCliente = new Cliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        correo: req.body.correo,
        password: hashedPassword
    })

    try {
        var success = await newCliente.save((err, cliente) => {
            //Sends an status of error if something bad happens
            if (err) return res.code(500).send("There was a problem regestrying the cliente")
            //Creates a JWT, It allows the user to make request to the API
            var token = jwt.sign({
                id: cliente._id
            }, config.secret, {
                //Expires in the asigned time
                expiresIn: 86400
            })

            res.code(200).send({
                auth: true,
                token: token
            })
        })

        return success
    } catch (err) {
        throw new Error(err.message)
    }

}




//https://stackoverflow.com/questions/30089604/jwt-whats-a-good-secret-key-and-how-to-store-it-in-an-node-js-express-app#30090120