var express = require('express');
var router = express.Router();
const db = require('../database').database;
const { firebase } = require("../database") 

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(new Date());
  let phoneModels = [];
  var query = db.query('SELECT * FROM phone_models').spread((results) => {
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      phoneModels.push(element);
    }
    console.log(results);
    res.render('phones', { title: 'Rogers Immersive', phoneModels: phoneModels });
  });
});


// POST to next phone
router.post('/compare', function(req, res, next) {
  var prevModel = req.body.model;
  var prevImage = req.body.image;
  writeNewData('yes', prevModel, prevImage);

  let phoneModels = [];
  var query = db.query('SELECT * FROM phone_models').spread((results) => {
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      phoneModels.push(element);
    }
    console.log(results);
    res.render('compare', { title: 'Rogers Immersive', phoneModels: phoneModels });
  });
});

// PUT data in firebase db
function writeNewData(value, phone, imageurl) {
  var newPhoneRef = firebase.database().ref('newphone/');
  newPhoneRef.set({
    current: 1
  })

  var pushRef = firebase.database().ref('update/').push();
  pushRef.set({
      updated: value,
      phone: phone,
      imageurl: imageurl
  }).then(() => {
      //console.log('write success');
  }).catch(err => {
      console.log('error :' + err);
  });
}

module.exports = router;
