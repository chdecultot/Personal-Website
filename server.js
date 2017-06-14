var express = require('express');
var fs = require ('fs');
var http = require ('http');
var path = require ('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express ();
var router = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true })); // support encoded bodies

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', router);
router.post('/', handleContact);

// Handle 404
app.use(function(req, res) {
    res.status(404).redirect('/' + '404.html');
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500).redirect('/' + '500.html');
    console.log(error);
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on" + port);
});


var transporter = nodemailer.createTransport({
    host: 'mail.gandi.net',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});


function handleContact(req, res){


    var message = {
        from: 'contact@chdecultot.com',
        to: 'chdecultot@gmail.com',
        subject: 'New Form Submission',
        text: 'NAME: '+ req.body.name + ' ||PHONE: ' + req.body.phone + ' ||EMAIL: '+ req.body.email + ' ||MESSAGE: '+ req.body.textarea

    };

    transporter.sendMail(message, function(err, info) {
            if (err) {
                console.log("FAILED", err);
            } else {
                console.log('SUCCESS', info);

                if (req.baseUrl == '/fr/') {
                    res.redirect(req.baseUrl + "/content/feedback/");
                } else {
                    res.redirect(req.baseUrl + "/en/content/feedback/");
                }
            }
    });

};
