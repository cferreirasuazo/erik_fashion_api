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

exports.generateOrden = async req =>{

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

exports.generarOrden = async (req) =>{
        try{
            var cliente = Cliente.findById({_id:req.id_cliente})
            console.log(cliente)
        }catch(err){
            boom.boomify(err)
        }
}