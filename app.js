var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var templating = require('consolidate');
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + ''); // + '/view'

var request = require('request');
var urlutils = require('url');

app.get('/', function (req, res) {
    res.render('translator', {
        title: 'Заполни форму, падла!'
    });
});




app.post('/', function (req, res) {
    if (!req.body.text || req.body.text == "") {
        res.render('translator', {
            title: "Веедите слово для перевода"
        });
    } else {
        var url = urlutils.format({
            protocol: 'https',
            hostname: 'translate.yandex.net',
            pathname: 'api/v1.5/tr.json/translate',
            query: {
                key: 'trnsl.1.1.20160726T120412Z.9c0dec7207e72365.39e8fcdd3ab465305de98677ebf6b3481a7b0da6',
                lang: req.body.lang,
                text: req.body.text
            }
        });

        request.get({ url: url, json: true },
            function (error, response, json) {
                var data = {};

                if (error || json.code != 200) {
                    data = {
                        title: "ошибка при переводе слова " + req.body.text,
                        error: json.message
                    }
                } else {
                    data = {
                        title: 'перевод слова ' + req.body.text + ": " + json.text
                    }
                }
                res.render('translator', data);
            });






    }
})


app.get('/last10', function (req, res){
    var last10 = [];
    last10.push({req: 'hellj', res: 'привет мир'});
    last10.push({req: 'ehf', res: 'п пароарапвет мир'});
    last10.push({req: 'zs we', res: 'пр в пава пваир'});
    res.render('last10', {
        title: 'последние для примера',
        words: last10
    })
})



app.listen(3000, function () { console.log('заеблось на 3000 порту') });