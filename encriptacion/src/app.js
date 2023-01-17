const express =require('express');
const path =require('path');
const morgan = require("morgan");
const mysql=require('mysql');
const myConnection=require('express-myconnection');
const app=express();
//importing routes
const datosRoutes=require('./routes/datos');


//settings
app.set('port',process.env.PORT||3000);
app.set ('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
//middlewares
app.use(morgan('dev'))
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'encriptacion'
},'single'));

app.use(express.urlencoded({extended:false}));


//routes
app.use('/',datosRoutes);

//static files
app.use(express.static(path.join(__dirname,'public')))

//empezando server
app.listen(app.get('port'),()=>{
    console.log('server on port 3000');
})