const faker = require("faker");
const Articulo = require("../models/Articulo");
const Marca = require("../models/Marca");
const Cliente = require("../models/Cliente");
const Categoria = require("../models/Categoria");
const ClienteArticulo = require("../models/ClienteArticulo");

const arrCategorias = [faker.commerce.department(),faker.commerce.department(),faker.commerce.department(),faker.commerce.department(),faker.commerce.department()] 

const arrMarca = [faker.commerce.productMaterial(),faker.commerce.productMaterial(),faker.commerce.productMaterial(),faker.commerce.productMaterial()]

var categorias_id = [
    "5de2ec86c8aa4442114d195e", 	
    "5de2ec86c8aa4442114d195f", 	
    "5de2ec86c8aa4442114d1960", 	
    "5de2ec86c8aa4442114d1961", 	
    "5de2f155083f6545ffae944f", 	
    "5de2f155083f6545ffae9451", 	
    "5de2f155083f6545ffae9450", 	
    "5de2f156083f6545ffae9453", 	
    "5de2f156083f6545ffae9452"
]

var marcas_id = [
    "5de2ec86c8aa4442114d1963", 	
    "5de2ec86c8aa4442114d1962", 	
    "5de2ec86c8aa4442114d1966", 	
    "5de2ec86c8aa4442114d1965", 	
    "5de2ec86c8aa4442114d1964", 	
    "5de2f156083f6545ffae9454", 	
    "5de2f156083f6545ffae9455", 	
    "5de2f156083f6545ffae9457", 	
    "5de2f156083f6545ffae9456"
]


var articulos_id = [
    "5de2f8c3556ff1535aa0747a", 	
    "5de2f8c3556ff1535aa0747b", 	
    "5de2f8c3556ff1535aa0747c", 	
    "5de2f8c3556ff1535aa0747d", 	
    "5de2f8c3556ff1535aa0747e", 	
    "5de2f8c3556ff1535aa0747f", 	
    "5de2f8c3556ff1535aa07482", 	
    "5de2f8c3556ff1535aa07481", 	
    "5de2f8c3556ff1535aa07483", 	
    "5de2f8c3556ff1535aa07480", 	
    "5de2f8c3556ff1535aa07484", 	
    "5de2f8c3556ff1535aa07485", 	
    "5de2f8c3556ff1535aa07487", 	
    "5de2f8c3556ff1535aa07488", 	
    "5de2f8c3556ff1535aa07489", 	
    "5de2f8c3556ff1535aa0748a", 	
    "5de2f8c3556ff1535aa07486", 	
    "5de2f8c3556ff1535aa0748c", 	
    "5de2f8c3556ff1535aa0748d", 	
    "5de2f8c3556ff1535aa07492", 	
    "5de2f8c3556ff1535aa07491", 	
    "5de2f8c3556ff1535aa0748e", 	
    "5de2f8c3556ff1535aa0748b", 	
    "5de2f8c3556ff1535aa0748f", 	
    "5de2f8c3556ff1535aa07490"
]

var clientes_id = [
   
	
        "5de2ec86c8aa4442114d1946", 	
        "5de2ec86c8aa4442114d194b", 	
        "5de2ec86c8aa4442114d1950", 	
        "5de2ec86c8aa4442114d1955", 	
        "5de2ec86c8aa4442114d195a", 	
        "5de2ec86c8aa4442114d1952", 	
        "5de2ec86c8aa4442114d1957", 	
        "5de2ec86c8aa4442114d195c", 	
        "5de2ec86c8aa4442114d194e", 	
        "5de2ec86c8aa4442114d1953", 	
        "5de2ec86c8aa4442114d1958", 	
        "5de2ec86c8aa4442114d195d", 	
        "5de2ec86c8aa4442114d193d", 	
        "5de2ec86c8aa4442114d1942", 	
        "5de2ec86c8aa4442114d1947", 	
        "5de2ec86c8aa4442114d194c", 	
        "5de2ec86c8aa4442114d1951", 	
        "5de2ec86c8aa4442114d1956", 	
        "5de2ec86c8aa4442114d195b", 	
        "5de2f155083f6545ffae93eb"


]



async function makeCarrito(){
    for(var i = 0; i < 100; i++){
        var amount = Math.floor((Math.random() * 15) + 1);
        var randomCliente = clientes_id[Math.floor((Math.random() * clientes_id.length) + 1)];
        var randomArticulo = articulos_id[Math.floor((Math.random() * articulos_id.length) + 1)];

        const clienteArticuloNew = new ClienteArticulo({
            clienteID: randomCliente,
            articuloID: randomArticulo,
            cantidad: amount
        })

        try{
            var success = await clienteArticuloNew.save()
            console.log(success)
        }catch(err){
            console.log(err)
        }

    }
}


function makeProducts(){
    console.log("makeProducts")
    for (var i = 0; i< 25;i++){
        var randomMarca = marcas_id[Math.floor((Math.random() * marcas_id.length) + 1)];
        var randomCategoria = categorias_id[Math.floor((Math.random() * categorias_id.length) + 1)]
        var precio = Number(faker.commerce.price())
        const articulo = new Articulo({
            nombre: faker.commerce.productName(),
            descripcion: faker.lorem.words(),
            precio:precio,
            categoria:randomCategoria,
            marca:randomMarca
        })


        try{
            articulo.save()
        }catch(err){
            console.log(err)
        }

    }
}

function makeClients(){
    for (var i = 1 ; i<= 100;i++){
        const cliente = new Cliente({
            nombre: faker.name.firstName(),
            apellido:faker.name.lastName(),
            direccion: faker.address.streetName(),
            telefono: faker.phone.phoneNumber(),
            correo: faker.internet.email(),
            usuario: faker.internet.userName(),
            password: faker.internet.password(),
            fechaRegistro: new Date().getDate()
        })
        try{
              cliente.save()  
        }catch(err){
            console.log(err)
        }
    }
}


function makeSeed(){
    makeClients()

    arrCategorias.map( (x) => {
        var newCategoria = new Categoria({"nombre":x})
        try{
            newCategoria.save()
        }catch(err){
            console.log(err)
        }
    })
    
    arrMarca.map((x) => {
        var newMarca = new Marca({"nombre":x})
        try{
            newMarca.save()
        }catch(err){    
            console.log(err)
        }
    })




}






module.exports = makeCarrito

