var express = require('express')
var app = express()

app.get('/', function (req, res) {
  var DataSource = require('./source/' + req.query.source)
  var source = new DataSource()
  source.get(req.query.page || 1).then(function (data) {
    res.set('Access-Control-Allow-Origin', '*')
    res.send(data)
  })
})

app.listen(process.env.VCAP_APP_PORT || 3000)