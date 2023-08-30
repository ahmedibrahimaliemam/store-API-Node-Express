const express = require('express') ;
const dbConnection = require('./db/connect');
const routes = require('./routes/products');
require("dotenv").config() ;
const app = express()
const port = process.env.PORT||3000 ;
//midelware
app.use(express.json()) ;
dbConnection(process.env.DB_URI) ;
app.use("/api/v1/products",routes) ;
//app.get("/",(req,res)=>{res.json({mes:"hello"})}) ;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
