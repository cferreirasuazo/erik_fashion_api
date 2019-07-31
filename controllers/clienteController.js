const boom = require('boom')
const Cliente = require("../models/Cliente")


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
        const cliente = new Cliente(req)
        const newCliente = await cliente.save()
        return newCliente
    }catch(err){
        throw boom.boomify(err)
    }
}

