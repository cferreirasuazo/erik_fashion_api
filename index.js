// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})


const mongoose = require('mongoose')
const boom = require('boom')
const cors = require("cors")

const url = "mongodb://admin:lolo2020@ds251158.mlab.com:51158/erikfashion"
mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true })
 .then(() => console.log("Connected to DB"))
 .catch(err => console.log(err))
mongoose.set('useFindAndModify', false);
const routes = require("./routes/index")

var seed = require("./tools/seed")

var controller = require("./controllers/clienteController");


var req = {
  id_cliente: "5de2ec86c8aa4442114d18fb",
}


controller.actualizarCarrito(req)


fastify.register(require('fastify-cors'), {
  origin:"*",
  allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
})

routes.forEach((route, index) => {
  fastify.route(route)
 })
// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(4000)
    console.log("SUCCESS")
     // fastify.log.info(`server listening on ${fastify.server.address().port}`)

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()