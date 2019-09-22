var express = require('express');
var router = express.Router();
const db = require('../database').database;
const { firebase } = require("../database")

/* GET home page. */
router.get('/', function (req, res, next) {
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
router.post('/compare', function (req, res, next) {
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

/* GET checkout page. */
router.get('/checkout', function (req, res, next) {
  console.log(new Date());
  let phoneModels = [];
  var query = db.query('SELECT * FROM phone_models').spread((results) => {
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      phoneModels.push(element);
    }
    console.log(results);
    res.render('checkout', { title: 'Rogers Immersive', phoneModels: phoneModels });
  });
});

// PUT data in firebase db
function writeNewData(value, phone, imageurl) {
  var newPhoneRef = firebase.database().ref('newphone/');
  newPhoneRef.set({
    current: 1,
    phone: phone,
    imageurl: imageurl
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

async function readFirebaseData() {
  var newPhoneRef = firebase.database().ref('newphone/');
  var anotherPhoneRef = firebase.database().ref('anotherphone/');
  newPhoneRef.once('value').then(function (snapshot) {
    if (snapshot.exists()) {
      var phone = snapshot.child("phone").val();
      console.log('phone: ' + phone);
    } else {
      console.log('current index not in db');
    }
  }).then(() => {

  }).catch(err => {
    console.log('error :' + err);
  });

}

module.exports = router;
