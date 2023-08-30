const productsModel = require("../models/product");
const getAllProducts=async(req,res,next)=>{
    const {featured , company ,name,sort, fields,numericalFilter}=req.query ;
    const featuredObj={} ;
    if(featured){
        featuredObj.featured=(featured==="true")?true:false ;
    }
    //check company
    if(company){
        featuredObj.company=company ;
    }
    if(name){
        featuredObj.name={$regex:name , $option:"i"} ;
    }
    //numericalFilter
    if(numericalFilter)
    {
        var val=numericalFilter.split(",") ;
        var number ;
        var operation ;
for(let i=0 ; i<val.length ; i++){
if(val[i].includes(">=")){
    str=val[i].slice(0,val[i].indexOf(">=")) ;
    number=val[i].slice(val[i].indexOf(">=")+2) ;
    operation="$gte" ;
}
else if(val[i].includes("<=")){
    str=val[i].slice(0,val[i].indexOf("<=")) ;
    number=val[i].slice(val[i].indexOf("<=")+2)
    operation="$lte" ;
}
else if(val[i].includes("=")){
    str=val[i].slice(0,val[i].indexOf("=")) ;
    number=val[i].slice(val[i].indexOf("=")+1)
    operation="$eq" ;
}
else if(val[i].includes(">")){
    str=val[i].slice(0,val[i].indexOf(">")) ;
    number=val[i].slice(val[i].indexOf(">")+1)
    operation="$gt" ;
}
else if(val[i].includes("<")){
    str=val[i].slice(0,val[i].indexOf("<")) ;
    number=val[i].slice(val[i].indexOf("<")+1)
    operation="$lt" ;
}
else{
    console.log(`error`);
}
featuredObj[str]={[operation]:number}
}
}
//end numerical filter
    //initialize for the result to make chaining
    console.log(featuredObj);
    let result=productsModel.find(featuredObj) ;
    if(sort){
        const sortStr=sort.replace(","," ") ;
        result=result.sort(sortStr) ;

    }
    else{
        result=result.sort("createdAt") ;
    }
    //check the fields
    if(fields){
        const fieldsStr=fields.replace(","," ") ;
        result=result.select(fieldsStr) ;
    }
    //check the limit
    const page=(+req.query.page)||1 ;
    const numLimit=(+req.query.limit)||10 ;
    const skip=(page-1)*numLimit ;
    result=result.skip(skip).limit(numLimit) ;
    try{
        const allProducts= await result ;
        res.status(200).json({dataLen:allProducts.length,data:allProducts}) ;
    }
    catch(err){
        res.status(500).json({message:`error to get all products!`}) ;
    }
}



module.exports=getAllProducts ;