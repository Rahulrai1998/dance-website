const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 80;
const app = express();
//Express stuffs
app.use('/static',express.static('static'));
app.use(express.urlencoded())
//PUG stuffs
app.set('view engine','pug');//set the template engine as pug
app.set('views',path.join(__dirname,'views'));//set the views directory

app.get('/',(req,res) => {
    const params = {};
    res.status(200).render('home.pug',params)
;
});

app.get('/contact',(req,res)=>{
    const params ={};
    res.status(200).render('contact.pug',params);
});

app.listen(port , ()=>{console.log(`Application running on port ${port}`)});