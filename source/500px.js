var q = require('q')
var request = require('request')

var DataSource = function () {
}

DataSource.prototype.get = function (page) {
  return q.Promise(function (resolve) {
    request.get('https://marketplace.500px.com/api/photos?sort=licensed_at&per_page=40&page=' + (page + 1),
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
