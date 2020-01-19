const boom = require("boom")
const Articulo = require("../models/Articulo");

exports.getArticles = async req => {
    try {
        const articulos = await Articulo.find()
        return articulos;
    } catch (err) {
        throw boom.boomify(err)
    }
}