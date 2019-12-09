// Require the framework and instantiate it
require('dotenv').config()
const fastify = require('fastify')({
  logger: true
})

const mongoose = require('mongoose')
const boom = require('boom')
const cors = require("cors")


const url = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWD}@ds251158.mlab.com:51158/erikfashion`

const url2 = "mongodb://admin:lolo2020@ds251158.mlab.com:51158/erikfashion"

mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true })
 .then(() => console.log("Connected to DB"))
 .catch(err => console.log(err))
mongoose.set('useFindAndModify', false);
const routes = require("./routes/index")
var seed = require("./tools/seed")
fastify.register(require('fastify-cors'), {
  origin:"*",
  allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
})


var cliente = require("./models/Cliente");
var clienteArticulo = require("./models/ClienteArticulo");
var returnClientes = require("./controllers/clienteController")

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
    await fastify.listen(process.env.PORT)
     // fastify.log.info(`server listening on ${fastify.server.address().port}`)

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()