var express = require('express');
var router = express.Router();
const db = require('../database').database;
const { firebase } = require("../database")

var updateRef = firebase.database().ref('update');

router.get('/', function (req, res, next) {
  res.render('display', { title: 'Rogers Immersive Display'});
  updateRef.on('value', function (snapshot) {
    console.log('res: ' + snapshot.val());  
    //res.redirect('back');
  });
  
});

module.exports = router;
