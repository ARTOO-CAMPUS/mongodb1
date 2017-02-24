var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//CONNESSION DATABASE MONGOLAB
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds161069.mlab.com:61069/sidagroup', function (err) {
	if (err) {
		throw err;
	}
	console.info("database connesso");
});

//SETUP DEL SERVER EXPRESS
var app = express();

//MIDDLEWARE BODY PARSER
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////////////////////////////
//NOVO SCHEMA
var Schema = mongoose.Schema;

var schemaUtente = new Schema({
	nome: String,
	cognome: String,
	eta: Number,
});

schemaUtente.methods.nomecompleto = function () {
	return this.nome + ' ' + this.cognome;
};

//NOUVO MODELLO
var Utente = mongoose.model('Utente', schemaUtente);

//CREAZIONE UTENTE
var minorenne = new Utente({
	nome: "Paolo",
	cognome: "Piccolo",
	eta: 16
});

minorenne.save().then(function () {
	console.log('utente salvato nel db');
}).catch(function (err) {
	throw err;
});

//TUTTI GLI UTENTI
Utente.find()
	.exec()
	.then(function (utenti) {
		console.log("\nLISTA UTENTI");
		console.log(utenti);
	})
	.catch(function (err) {
		throw err;
	});

//UTENTI CHE SI CHIAMANO PAOLO
Utente.find({
		nome: "Paolo"
	})
	.exec()
	.then(function (utenti) {
		console.log("\nLISTA UTENTI DI NOME PAOLO");
		console.log(utenti);
	})
	.catch(function (err) {
		throw err;
	});

//UTENTI MAGGIORENNI
Utente.find({
		eta: {
			$gt: 18
		}
	})
	.exec()
	.then(function (utenti) {
		console.log("\nLISTA UTENTI MAGGIORENNI");
		console.log(utenti);
	})
	.catch(function (err) {
		throw err;
	});


//START SERVER
app.listen(3000, function () {
	console.log('server express start on: http://localhost:' + 3000);
})