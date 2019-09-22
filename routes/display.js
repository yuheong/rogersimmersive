var express = require('express');
var router = express.Router();
const db = require('../database').database;
const { firebase } = require("../database")

router.get('/', function (req, res, next) {
  console.log(req);
  res.render('display', { title: 'Rogers Immersive Display'});
});

module.exports = router;
