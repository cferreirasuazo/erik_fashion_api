const mongoose = require("mongoose")


const ordenArticuloSchema = new mongoose.Schema({

    ordenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orden"
    },
<<<<<<< HEAD
    articuloId: {
=======
    articulo: {
>>>>>>> clean_code
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articulo"
    },
    cantidad: String,

})


module.exports = mongoose.model("ordenArticulo", ordenArticuloSchema)
