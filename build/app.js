const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 80;
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    address : String,
    desc : String
});
var Contact = mongoose.model('Contact',contactSchema);
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
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{res.send("This document has been saved")}).catch(()=>{res.status(400).send("Error")})
    
})
app.listen(port , ()=>{console.log(`Application running on port ${port}`)});