const Cliente = require("../models/Cliente")
const Order = require("../models/Orden")

const boom = require("boom")


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
            estadoOrden:true,
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