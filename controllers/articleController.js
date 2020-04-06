const boom = require("boom")
const Articulo = require("../models/Articulo");
const Categoria = require("../models/Categoria");
const ClienteArticulo = require("../models/ClienteArticulo");


exports.deleteArticle = async (req,res) => {
    try{
        var article = await ClienteArticulo.find({articulo: req.body.id});
        res.code(200).send(article);
        
    }catch(err){
        res.code(500).send(err)
    }
}


exports.getArticles = async req => {
    try {
        var articulos = await Articulo.find()
        return articulos;
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getArticleById = async (req,res) =>{
    try{
                
        var categoria = req.params.id;
        var categorias = await Categoria.findOne({nombre:categoria})
        var articulosArr = await Articulo.find({categoria:categorias._id}).populate("categoria marca")
        res.code(200).send(articulosArr);
        return articulosArr
        

    }catch(err){
        throw new Error(err.message)
    }
}
