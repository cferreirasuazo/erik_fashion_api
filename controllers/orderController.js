const Cliente = require("../models/Cliente")
const Order = require("../models/Orden")
const ClienteArticulo = require("../models/ClienteArticulo");
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
        console.log(err.message)
    }
}   


exports.getOrden = async (req) => {
    try{
        var order = await Order.findOne({clienteId:req.id_cliente})
        console.log("ON ORDER")
        console.log("/****************************************/")
        return order

    }catch(err){
        return new Error (err.message)
    }
}

exports.addOrdenArticulo = async (orden) => {
    try{
        console.log("ON ADDORDER")
        console.log("/****************************************/")
        var {_id,clienteId} = orden
        var clienteArticulos = await ClienteArticulo.find({clienteID:clienteId})
        var articulos = clienteArticulos.map((articulo)=> {
            var {articuloID, cantidad,} = articulo
            return {
                articuloID: articuloID,
                cantidad: cantidad
            }
        })

        return articulos
        
    }catch(err){
        console.log(err.message)
    }

}






exports.query = async(req)=>{
    try{
        console.log("ON QUERY")
        console.log("/****************************************/")
        var order = await this.getOrden(req)
        var stuff = await this.addOrdenArticulo(order)
        console.log(stuff)
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

