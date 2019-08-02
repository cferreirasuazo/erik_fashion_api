const faker = require("faker");
const Articulo = require("../models/Articulo");
const Marca = require("../models/Marca");
const Cliente = require("../models/Cliente");
const Categoria = require("../models/Categoria");


const arrCategorias = ["Zapatos","Mochilas","Relojes","Objectos Sexuales"] 
const arrMarca = ["Addidas","Nike","Champion","Jordan","Fila"]


var marcas = []
var categorias = []

// async function getMarcasCategorias(){
//   try{
//        marcas = await Marca.find()
//        categorias = await Categoria.find() 
//        console.log(marcas)      
//   }catch(err){
//       console.log(err)
//   }
// }

 async function makeRandomArticles(){
    try{
        var marcas = await Marca.find()
        console.log(marcas)
        console.log("-----------------------------------------------")
        var categorias = await Categoria.find()
        console.log(categorias) 
    }catch(err){
        console.log(err)
    }


    console.log("categorias length" + marcas.length )
  

}







function makeArticulo(){

    for(var i = 0 ; i <= 100 ; i++){
        var articulo = new Articulo({

        })
    }

}







function makeClients(){
    for (var i = 1 ; i<= 10;i++){
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
    //makeClients()

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







module.exports = makeRandomArticles