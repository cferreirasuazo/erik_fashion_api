const controllers = require("../controllers")
const articleControllers = require("../controllers/articleController")
const cliente = require("../controllers/clienteController")
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
    },
    {
        method:"GET",
        url:"/api/cliente/:id",
        handler:cliente.clienteArticulos
    }



]


module.exports = routes