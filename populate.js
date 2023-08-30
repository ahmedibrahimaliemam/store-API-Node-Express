const dbConnection = require("./db/connect");
const productsModel = require("./models/product");
const staticProducts=require("./products.json") ;

require("dotenv").config() ;
const start=async()=>{
    try{
        await dbConnection(process.env.DB_URI) ;
        await productsModel.deleteMany() ;
        await productsModel.insertMany(staticProducts) ;
    }
    catch(err){
        console.log(`error to connect the atlas data base!`);

    }
}
start() ;