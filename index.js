const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

function htmlEscape(text) {
    return text.replace(/&/g, '&amp;').
        replace(/</g, '&lt;').
        replace(/"/g, '&quot;').
        replace(/'/g, '&#039;');
}

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'base'
});

mysqlConnection.connect((err) => {
    if(!err){
        console.log('db conectada com sucesso');
    }else{
        console.log('erro ao se conectar no bd.');
    }
});

app.get('/:cpf', (req, res) => {
    var cpf = htmlEscape(req.params.cpf);
    mysqlConnection.query('SELECT * FROM dados_brasil_teste WHERE cpf= ? limit 1',[cpf], (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }else{
            res.send('error');
        }
    })
});

app.listen(3000, ()=> {
    console.log('express rodando porta 3000');
})