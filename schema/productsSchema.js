const mongoose=require("mongoose") ;
const Schema=mongoose.Schema ;
const productsSchema=new Schema({
    name:{type:String , required:[true,`data must contain product name!`]  },
    rating:{type:Number , default:4.5} ,
    featured:{type:Boolean , default:false} , 
    createdAt:{type:Date , default:Date.now()} ,
    price:{type:Number , required:[true,"data Must Contain the price of product!"]} ,
    company:{type:String , enum:["ikea" , "liddy","caressa","marcos"]} ,
})
module.exports=productsSchema ;
