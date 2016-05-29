var app = require('express')()
var caches = {}

app.get('/', function (req, res) {
  var cache = caches[req.url]
  
  if (cache && Date.now() - cache.time < 3600000) {
    response(cache.data)
  } else {
    req.query.source = 'so'
    var source = new (require('./source/' + (req.query.source || '500px')))()
    source.get(req.query.page || 0).then(function (data) {
      caches[req.url] = {
        time: Date.now(),
        data: data
      }
      response(data)
    })
  }
  
  function response(data) {
    res.set('Access-Control-Allow-Origin', '*')
    res.send(data)
  }
})

app.listen(process.env.VCAP_APP_PORT || 3000)
