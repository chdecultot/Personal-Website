var express = require('express'),
    logger = require('morgan'),
    app = express()
    //template = require('jade').compileFile(__dirname + '/templates/index.jade')

app.use(logger('dev'))
app.use(express.static(__dirname + '/build'))

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
