const faker = require("faker");
const Articulo = require("../models/Articulo");
const Marca = require("../models/Marca");
const Cliente = require("../models/Cliente");
const Categoria = require("../models/Categoria");


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





function makeProducts(){
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






module.exports = makeProducts

