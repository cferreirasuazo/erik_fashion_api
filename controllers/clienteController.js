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

exports.agregarACarrito = async (req) => {
        var articulo = {
            id_articulo:req.articulo,
            cantidad:req.cantidad
        }
        try{
        var cliente = await Cliente.findByIdAndUpdate({_id:req.id_cliente},{
            $push:{carrito:req.articulo}
        },{new:true})
        return cliente
        }catch(err){
            boom.boomify(err)
        }
}

exports.actualizarCarrito = async (req) => {
    
        var _id = "5de2ec86c8aa4442114d18fb";
        var cantidad = 3000
        console.log(_id)

        try{
            Cliente.update({"_d":_id},{
                $set:{
                    "carrito.$.cantidad":5000
                }
            })
        }catch(err){
            console.log(err)
        }




}
