const boom = require('boom')
const Cliente = require("../models/Cliente")
const Order = require("../models/Orden")



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

exports.agregarACarrito = async (req) =>{
        try{
        var cliente = await Cliente.findByIdAndUpdate({_id:req.id_cliente},{
            $push:{carrito:req.articulo}
        },{new:true})
        return cliente
        }catch(err){
            boom.boomify(err)
        }
}

