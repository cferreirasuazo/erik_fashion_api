const mongoose = require("mongoose")


const ordenArticuloSchema = new mongoose.Schema({

    ordenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orden"
    },
    articulo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articulo"
    },
    cantidad: String,

})


module.exports = mongoose.model("ordenArticulo", ordenArticuloSchema)
