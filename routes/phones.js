var express = require('express');
var router = express.Router();
const db = require('../database').database;

/* GET home page. */
router.get('/', function(req, res, next) {
  let phoneModels = [];
  db.query('SELECT * FROM phone_models', function (error, results, fields) {
    if (error) throw error;
    // connected!
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      phoneModels.push(element);
    }
  });
  
  res.render('phones', { title: 'Rogers Immersive', phoneModels: phoneModels });
});

module.exports = router;
