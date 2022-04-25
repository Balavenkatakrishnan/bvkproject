const express=require('express')
const bodyparser=require("body-parser");
const html=require('html')
const app=express()
const port= process.env.PORT || 3000;

const homeroutes = require('./homeroutes');
app.use(bodyparser.urlencoded({extended :true}));
app.use(express.json());
app.engine('html',require('ejs').renderFile)
app.set('view engine', "ejs");
app.get("/",(req, res)=>{
    //res.send("Hello World!");
    res.sendFile(__dirname +"/home.html");
});
app.use("/home",homeroutes);

app.listen(port,()=> console.log(`app listening on port ${port}`));