const mongoose=require("mongoose") ;
require("dotenv").config() ;
const dbConnection=async(dbUri)=>{
await mongoose.connect(dbUri,
  {useNewUrlParser:true,
    useUnifiedTopology:true
  }).then(()=>console.log(`success to connect the atlas!`))
  .catch((err)=>console.log(`error to connect to atlas!`,err)) ;
}
module.exports=dbConnection ;