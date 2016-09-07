var express = require('express');
var fs = require ('fs');
var http = require ('http');
var path = require ('path');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var bodyParser = require('body-parser');

var app = express ();
var server = http.createServer(app);
var router = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true })); // support encoded bodies

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, 'dist')));
// Handle 404
app.use(function(req, res) {
    res.status(404).redirect('/' + '404.html');
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500).redirect('/' + '500.html');
    console.log(error);
});

app.use('/', router);
router.post('/', handleContact);


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on" + port);
});


function handleContact(req, res){
var options = {
    auth: {
        api_user: 'chdecultot',
        api_key: 'oL375732'
    }
};

var client = nodemailer.createTransport(sgTransport(options));

var email = {
    from: 'chdecultot@gmail.com',
    to: 'chdecultot@gmail.com',
    subject: 'New Form Submission',
    text: 'NAME: '+ req.body.name + ' ||PHONE: ' + req.body.phone + ' ||EMAIL: '+ req.body.email + ' ||MESSAGE: '+ req.body.textarea
};

client.sendMail(email, function(err, info){
    if (err ){
        console.log(err);
    }
    else {
        console.log('Message sent: ' + info.response);
        if (req.baseUrl == '/fr/') {
        res.redirect(req.baseUrl + "/content/feedback/");
        } else {
            res.redirect(req.baseUrl + "/en/content/feedback/");
        }
        }
});
};
