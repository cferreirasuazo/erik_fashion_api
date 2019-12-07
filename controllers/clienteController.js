const boom = require('boom')
const Cliente = require("../models/Cliente")
const Order = require("../models/Orden")
const ClienteArticulo = require("../models/ClienteArticulo")



exports.getClientes = async req =>{
    try{
        const clientes = await Cliente.find()
        return clientes
    }catch(err){
        throw boom.boomify(err)
    }
}

exports.addCliente = async req =>{
    try{
        const cliente = new Cliente(req.body)
        const newCliente = await cliente.save()
        return newCliente
    }catch(err){
        throw boom.boomify(err)
    }
}

exports.getArticulos = async(req) => {
    try{
        const articulos = await ClienteArticulo.find({clienteID: req.id},(err,obj)=>{
            console.log(obj)
        })

    }catch(err){
        boom.boomify(err);
    }
}