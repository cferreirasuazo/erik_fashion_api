const ClienteArticulo = require("../models/ClienteArticulo")


export default  ClienteArticulo.find({clienteID:id})
.select("articuloID cantidad -_id")
.populate("articuloID","nombre descripcion precio")
