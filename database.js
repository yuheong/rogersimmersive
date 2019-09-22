var mysql = require('mysql-promise')();

mysql.configure({
    connectionLimit: 10,
    host: 'remotemysql.com',
    user: 'CsERhmoU23',
    password: 'fZ8BwUY7fj',
    database: 'CsERhmoU23',
    insecureAuth : true
});

mysql.query('SELECT 1 + 1 AS solution').then((results) => {
    console.log('The solution is: ', results[0])
    }).catch(error => {
        throw error;
    })

module.exports = { database: mysql };