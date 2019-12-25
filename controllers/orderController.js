const Cliente = require("../models/Cliente")
const Order = require("../models/Orden")

const boom = require("boom")

const ordenEstados = Object.freeze({
    CREADA:0,
    LISTA:1,
    ENVIADA:2,
    ENTREGADA:3,
    DEVOLVIDA:4,
    CANCELADA:5
})


exports.generarOrden = async (req) =>{
    try{
       
        var newOrden = new Order({
            fechaCreada:new Date(),
            fechaEntrega:req.entrega,
            estadoOrden:ordenEstados.CREADA,
            clienteId:req.id_cliente,
            direccion: req.direccion,
        })
        var saved = await newOrden.save()
        console.log(saved)
      
        
    }catch(err){
        console.log(err)
    }
}   


exports.getOrden = async (req) => {
    try{
        var order = await Order.find({clienteId:req.id_cliente})
        return order

    }catch(err){
        console.log(err)
    }
}

exports.cancelarOrden = async (req) =>{
    try{
        var ordenActualizar = await Order.findByIdAndUpdate(req,
            {"ordenEstado": ordenEstados.CANCELADA},
            {new:true})
        console.log(ordenActualizar)
    }catch(err){    
        console.log(err)
    }
}

