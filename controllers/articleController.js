const boom = require("boom")
const Articulo = require("../models/Articulo");


exports.getArticles = async req =>{
    try{
        const articles = await Articulo.find()
        return articles;
    }catch(err){
        throw boom.boomify(err)
    }
}