const Cliente = require("../models/Cliente")
const Order = require("../models/Orden")
const ClienteArticulo = require("../models/ClienteArticulo");
const boom = require("boom")
const OrdenArticulo = require("../models/ordenArticulo");

const ordenEstados = Object.freeze({
    CREADA: 0,
    LISTA: 1,
    ENVIADA: 2,
    ENTREGADA: 3,
    DEVOLVIDA: 4,
    CANCELADA: 5
})


exports.addOrden = async (req) => {
    try {

        var newOrden = new Order({
            fechaCreada: new Date(),
            fechaEntrega: req.entrega,
            estadoOrden: ordenEstados.CREADA,
            clienteId: req.id_cliente,
            direccion: req.direccion,
        })
        var saved = await newOrden.save()
        console.log(saved)


    } catch (err) {
        throw new Error(err.message)
    }
}

exports.deleteOrden = async (req) => {
    var ordenId = req

    try {
        var status = await Order.deleteOne({
            _id: ordenId
        })
        console.log(status)
    } catch (err) {
        console.log(err.message)
    }



}

exports.getOrders = async (req) => {
    try {

        var orders = await Order.find({
            clienteId: req.id_cliente
        })
        return orders

    } catch (err) {
        console.log("ERROR ON GET ORDEN")
        throw new Error(err.message)
    }
}





exports.cancelarOrden = async (req) => {
    try {
        var ordenActualizar = await Order.findByIdAndUpdate(req, {
            "ordenEstado": ordenEstados.CANCELADA
        }, {
            new: true
        })
        console.log(ordenActualizar)
    } catch (err) {
        console.log(err)
    }
}
