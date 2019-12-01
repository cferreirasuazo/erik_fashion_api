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
const routes = require("./routes/index")

var seed = require("./tools/seed")

var controller = require("./controllers/orderController");

var req = {
  id_cliente: "5d5b1fcedf7edc0d5a2fd2c8",
  direccion: "lorem ipsum"
}


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

// seed.map(x =>{
//   var articulo = new Articulo(x)
//   try{
//       articulo.save()
//   }catch(err){    
//     console.log(err)
//   }
// })
