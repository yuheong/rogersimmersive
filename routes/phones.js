var express = require('express');
var router = express.Router();
const db = require('../database').database;

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

module.exports = router;
