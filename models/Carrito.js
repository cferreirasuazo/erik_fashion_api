const mongoose = require("mongoose")
const Cliente = require("../models/Cliente")
//const ordenCarrito = require("../models/ordenCarrito")


const carritoSchema = new mongoose.Schema({
    idCliente = {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cliente"
    }
})

module.exports = mongoose.model('Carrito',carritoSchema)


//Generar Orden con los articulos en el carrito
//Limpiar Carrito
//Eliminar articulo de carrito 


