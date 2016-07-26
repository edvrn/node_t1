var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoder({ extended: true }));
app.use(bodyParser.json());

var templating = require('consolidate');
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', _dirname + ''); // + '/view'

var request = require('request');
var urlutils = require('url');

app.get('/', function(req, res){
    res.render ('translator',{
        title: 'Заполни форму'
    });
});
