var q = require('q')
var request = require('request')

var DataSource = function () {
}

DataSource.prototype.get = function (page) {
  page = page || 0
  return q.Promise(function (resolve) {
    request.get('https://marketplace.500px.com/api/photos?page=' + page,
      function (error, response) {
        resolve(JSON.parse(response.body).data.map(function (item) {
          return {
            name: item.name,
            description: item.description,
            aspect_ratio: item.width / item.height,
            image: {
              small: item.images[2].url,
              large: item.images[6].url
            }
          }
        }))
      }
    )
  })
}

module.exports = DataSource
