var mysql = require('mysql-promise')();
var firebase = require('firebase');

mysql.configure({
    connectionLimit: 10,
    host: 'remotemysql.com',
    user: 'CsERhmoU23',
    password: 'fZ8BwUY7fj',
    database: 'CsERhmoU23',
    insecureAuth: true
});

var firebaseConfig = {
    apiKey: "AIzaSyAmHla0ZEptvRMpxq6KhFiMgnDn05nccPk",
    authDomain: "rogersimmerse.firebaseapp.com",
    databaseURL: "https://rogersimmerse.firebaseio.com",
    projectId: "rogersimmerse",
    storageBucket: "",
    messagingSenderId: "207917090458",
    appId: "1:207917090458:web:0f6cf8b9f24068970b8123"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

mysql.query('SELECT 1 + 1 AS solution').then((results) => {
    console.log('The solution is: ', results[0]);
}).catch(error => {
    throw error;
})

module.exports = { database: mysql, firebase: firebase };