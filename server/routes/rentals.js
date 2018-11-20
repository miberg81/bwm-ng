//will spesify rental routes: /rental/....
const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
//test route to get response from main url
router.get('', function (req, res) {
  // Rental.find will be called when we get response from the server
  //{} arg to find all Rentals in DB
  Rental.find({}, function (err, foundRentals) {
    res.json(foundRentals);
    //res.json({'ok':true});
  });
});

router.get('/:id', function (req, res) {
  const rentalId = req.params.id;
  Rental.findById(rentalId, function (err, foundRental) {
    if (err) {
      res.status(422).send({
        errors: [{
          title: 'Rental Error!',
          dedail: 'Could not find rental'
        }]
      });
    }
    res.json(foundRental);
  });
});
module.exports = router;
