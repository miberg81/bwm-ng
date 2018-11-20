const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev.js');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals.js');

//connect to Mongo DB, connect return a promise, so we can use then
mongoose.connect(config.DB_URI, { useNewUrlParser: true })
.then(() => {
        const fakeDb = new FakeDb();
        fakeDb.seedDb();
    });
const app = express();

app.use('/api/v1/rentals', rentalRoutes);

/*//check response for GET request to /renatls
app.get('/rentals', function(req,res){
    res.json({"success": true});
});*/

//in production: use POST variable:
//const PORT = process.env.PORT || 3001;
app.listen('3001',function(){
    console.log('I am running');
});