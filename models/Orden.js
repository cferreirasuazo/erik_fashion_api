const mongoose = require("mongoose")

const ordenSchema = new mongoose.Schema({
    fechaCreada:Date,
    fechaEntrega:Date,
    estadoOrden:Boolean,
    clienteId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cliente"
    },
    total:Number
})