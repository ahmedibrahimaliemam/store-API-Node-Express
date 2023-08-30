const getAllProducts = require("../controllers/products");

const routes=require("express").Router() ;
routes.route("/").get(getAllProducts) ;
module.exports=routes ;