const controllers = require("../controllers")
const clienteController = require("../controllers/clienteController")
const articleControllers = require("../controllers/articleController")
const routes = [
    {
        method: "GET",
        url: "/api/articulos",
        handler: controllers.getArticulos
    },
    {
        method: "POST",
        url: "/api/articulos",
        handler: controllers.addArticulo,
    },
    {
        method:"GET",
        url:"/api/articles",
        handler:articleControllers.getArticles
    }



]


module.exports = routes