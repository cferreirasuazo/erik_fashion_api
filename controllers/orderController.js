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
       
        var cliente = await Cliente.findById({_id:req.id_cliente});
        var precios = cliente.carrito.map((articulo)=>{
                return articulo.precio
        });

        var total = precios.reduce((acum,curr)=> acum + curr,0);

        var newOrden = new Order({
            fechaCreada:new Date(),
            fechaEntrega:new Date(),
            estadoOrden:ordenEstados.CREADA,
            clienteId:req.id_cliente,
            total:total,
            direccion: req.direccion,
            articulos: cliente.carrito
        })
        try{
            var saved = await newOrden.save()
            console.log(saved)
        }catch(err){
            boom.boomify(err)
        }
        
    }catch(err){
        boom.boomify(err)
    }
}   

exports.cancelarOrden = async (req) =>{
    try{
        var ordenActualizar = await Order.findByIdAndUpdate(req,
            {"ordenEstado": ordenEstados.CANCELADA},
            {new:true})
        console.log(ordenActualizar)
    }catch(err){    
        boom.boomify(err)
    }
}

