const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals.js');
const path = require('path');

//connect to Mongo DB, connect return a promise, so we can use then
mongoose.connect(config.DB_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    if (process.env.NODE_ENV === 'production'){
      const fakeDb = new FakeDb();
    fakeDb.seedDb();
    }
  });
const app = express();

app.use('/api/v1/rentals', rentalRoutes);

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist/bwm-ng');
  app.use(express.static(appPath));

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  })
}


/*//check response for GET request to /renatls
app.get('/rentals', function(req,res){
    res.json({"success": true});
});*/

//in production: use POST variable:
const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('I am running');
});
