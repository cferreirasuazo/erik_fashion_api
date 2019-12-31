const boom = require('boom')
const Cliente = require("../models/Cliente")
const Order = require("../models/Orden")
const ClienteArticulo = require("../models/ClienteArticulo")

exports.clienteArticulos = async req =>{
    try{
        
        var id = req.params.id
        // var req = await Promise.all([Cliente.find({_id:id}),ClienteArticulo.find({clienteID:id})])
        const articulos = await ClienteArticulo.find({clienteID:id})
            .select("articuloID cantidad")
            .populate("articuloID","nombre descripcion precio")
        
        const cliente = Cliente.find({_id:id})
        var req = await Promise.all([cliente,articulos])
        var cli = req[0];
        var art = req[1].map((item)=>{
            return {
                "_id": item._id,
                "id_articulo": item.articuloID._id,
                "descripcion":item.articuloID.descripcion,
                "nombre":item.articuloID.nombre,
                "precio":item.articuloID.precio,
                "cantidad":item.cantidad
            }
        });
        console.log(art)
        return [cli,art]
        
    }catch(err){
        return error
    }
}



exports.getClientes = async req =>{
    try{
        const clientes = await Cliente.find()
        console.log(clientes)
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