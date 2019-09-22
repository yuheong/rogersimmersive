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
    writeNewData('yes');
    res.render('phones', { title: 'Rogers Immersive', phoneModels: phoneModels });
  });
});

// PUT data in firebase db
function writeNewData(value) {
  var newRef = firebase.database().ref('update/').push();
  newRef.set({
    updated: value,
  }).then(() => {
    //console.log('write success');
  }).catch(err => {
    console.log('error :' + err);
  });
  
}

module.exports = router;
