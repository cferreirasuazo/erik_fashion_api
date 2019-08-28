// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const mongoose = require('mongoose')
const boom = require('boom')

const url = "mongodb://cferreirasuazo:Cristhian24*@ds245387.mlab.com:45387/erik_fashion"
mongoose.connect(url)
 .then(() => console.log("Connected to DB"))
 .catch(err => console.log(err))
const routes = require("./routes/index")

var seed = require("./tools/seed")

var controller = require("./controllers/orderController");

var req = {
  id_cliente: "5d5b1fcedf7edc0d5a2fd2c8",
  direccion: "lorem ipsum"
}
//controller.generarOrden(req)
//controller.cancelarOrden("5d6298b83577183a2fcd75d1")



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
    await fastify.listen(3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)

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