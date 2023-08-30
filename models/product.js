const productsSchema = require("../schema/productsSchema");

const productsModel=require("mongoose").model("products",productsSchema) ;



module.exports=  productsModel ;