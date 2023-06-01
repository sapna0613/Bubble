require('dotenv/config')
const express = require('express');
const bodyParser = require('body-parser');
const route = require("./routers/BubbleeRouters");
const mongoose = require('mongoose');
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
const multer= require("multer");
const cors = require('cors');

app.use(multer().any())
app.use(cors())







app.use(bodyParser.json());
app.use(require('./routers/BubbleeRouters'))
app.use(express.urlencoded({extended:true}));


mongoose.connect("mongodb+srv://user:12345@cluster0.i0bugnt.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


  
      
app.use('/', route);


app.listen(  5000, function () {
    console.log('Express app running on port ' + ( 5000))
});
