const boom = require('boom')
const Cliente = require("../models/Cliente")
const Order = require("../models/Orden")
const ClienteArticulo = require("../models/ClienteArticulo")
var bcrypt = require('bcryptjs');
var config = require("../config");
var jwt = require("jsonwebtoken");
var parseCliente = require("../utils/parseCliente");

exports.clienteArticulos = (req, res) => {
   
    try {

        Cliente.findOne({
            correo: req.body.cliente.correo
        }, async (err, cliente) => {

            if (err) return res.status(500).send("Task failed Successfully");
            if (!cliente) return res.status(404).send("Cliente no esta registrado");
            var token = jwt.sign({
                id: cliente._id
            }, config.secret, {
                expiresIn: "24h"
            })

            var secCliente = parseCliente(cliente)

            var passwordValid = bcrypt.compareSync(req.body.cliente.password, cliente.password)
            //If password is valid, returns all the information including client and articles
            if (passwordValid) {
                const articulos = await ClienteArticulo.find({
                        clienteID: cliente._id
                    })
                    .select("articulo cantidad")
                    .populate("articulo", "nombre descripcion precio")
                    .catch((err) => (console.log("ERROR")))
                res.status(200).send({
                    cliente: secCliente,
                    articulos: articulos
                })
            } else {
                return res.status(500).send("Invalid Password, try again")
            }

        })

    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getClientes = async req => {
    try {
        const clientes = await Cliente.find()
        console.log(clientes)
        return clientes
    } catch (err) {
        throw boom.boomify(err)
    }
}
exports.addCliente = async req => {
    try {
        const cliente = new Cliente(req.body)
        const newCliente = await cliente.save()
        return newCliente
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getArticulos = async (req) => {
    try {
        const articulos = await ClienteArticulo.find({
            clienteID: req.id
        }, (err, obj) => {
            console.log(obj)
        })

    } catch (err) {
        boom.boomify(err);
    }
}