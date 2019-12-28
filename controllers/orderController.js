const Cliente = require("../models/Cliente")
const Order = require("../models/Orden")
const ClienteArticulo = require("../models/ClienteArticulo");
const boom = require("boom")
const OrdenArticulo = require("../models/ordenArticulo");

const ordenEstados = Object.freeze({
    CREADA:0,
    LISTA:1,
    ENVIADA:2,
    ENTREGADA:3,
    DEVOLVIDA:4,
    CANCELADA:5
})


exports.addOrden = async (req) =>{
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
        throw new Error(err.message)
    }
}   


exports.getOrden = async (req) => {
    try{
        console.log(req.id_cliente)
        var order = await Order.findOne({clienteId:req.id_cliente})
       // console.log("ON ORDER")
       // console.log("/****************************************/")
        return order

    }catch(err){
        console.log("ERROR ON GET ORDEN")
        throw new Error (err.message)
    }
}

exports.addOrdenArticulo = async (orden) => {
    try{
       // console.log("ON ADDORDER")
       // console.log("/****************************************/")
        var {_id,clienteId} = orden
        var clienteArticulos = await ClienteArticulo.find({clienteID:clienteId})
        var articulos = clienteArticulos.map((articulo)=> {
            var {articuloID, cantidad,} = articulo
            return {
                articuloID: articuloID,
                cantidad: cantidad
            }
        })

        return {
            orden_id: _id ,
            articulos: articulos
        }
        
    }catch(err){
        console.warn("ERR ON addOA")
        throw new Error(err.message)
    }

}

async function addOrdenArticulo(articulos){
   try{
         articulos.articulos.forEach(async (articulo)=>{
                
                try{
                    var newOrdenArticulo = new OrdenArticulo({
                        ordenId: articulos.orden_id,
                        articuloId: articulo.articuloID    
                    })
                    let suc = await newOrdenArticulo.save()
                    console.log(suc)
                }catch(err){
                    throw new Error(err.message)
                }
         })

         return "SUCCESS"
   }catch(err){
       throw new Error(err.message)
   }
}




exports.generateOrder = async(req)=>{
    try{
        var order = await this.getOrden(req)//.catch((err)=>(console.log(err)))
        var stuff = await this.addOrdenArticulo(order)
        var stuff2 = await addOrdenArticulo(stuff) 
        
        return stuff2

    }catch(err){    
        console.warn("ERR QUERY")
        throw new Error(err.message)
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

