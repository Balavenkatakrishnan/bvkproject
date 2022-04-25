const { Router } =require ("express");
const bodyparser=require("body-parser");
const { db, pgpHelpers } = require('./lib/db-postgres');
const { json } = require("express/lib/response");
const { join } = require("lodash");
const router = Router();
const insertreg=['name','dob','phonenumber','dateofjoining']
const cs=new pgpHelpers.ColumnSet(['name','dob','phonenumber','dateofjoining'],{table:{table:'registration' ,schema: 'public'}})
router.get("/",gethome);

router.use(bodyparser.urlencoded({extended :true}));
function gethome(req,res){

    res.sendFile(__dirname +"/home.html");
}

router.get("/getregister",getregisterdata);
router.post("/",postdata);
async function getregisterdata(req,res){
    var data = await db.query('select * from public.registration')
   // console.log(data);
   
  
    
 data1=JSON.stringify(data)
 //console.log(data1)
 data2=JSON.parse(data1)
 //console.log(data2)
 //res.sendFile(__dirname +"/getregdetails.html");x
 res.render(__dirname +"/getregdetails.html",{Data: data1} )
 //res.render(__dirname +/getregdetails.html)
}

async function postdata(req,res){
    var namevalue=req.body.name;
    var dobvalue=req.body.DOB;
    var phonenumbervalue=req.body.phonenumber;
    var dateofjoiningvalue=req.body.DOJ;
    console.log( namevalue +" "+dobvalue+" "+phonenumbervalue+" "+dateofjoiningvalue);
   try{
    //const insertquery=await db.query(`INSERT INTO public.registration as reg (name,dob,phonenumber,dateofjoining) values (${name},${dob},${phonenumber},${dateofjoining})`);
    const values=[{name:namevalue,dob:dobvalue,phonenumber:phonenumbervalue,dateofjoining:dateofjoiningvalue}]
    const query =pgpHelpers.insert(values,cs);
    await db.none(query);
    res.sendFile(__dirname+"/regcomplete.html")
   }catch(error){
    console.log(error);
   }
   
}


module.exports=router