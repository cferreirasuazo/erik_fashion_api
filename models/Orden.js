const mongoose = require("mongoose")

const ordenSchema = new mongoose.Schema({
    fechaCreada:Date,
    fechaEntrega:Date,
    estadoOrden:Number,
    clienteId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cliente"
    },
    total:Number,
    direccion: String,
    articulos: {
        type:Array,
        default:[]
    }
})


module.exports = mongoose.model("Orden",ordenSchema)