var q = require('q')
var request = require('request')

var DataSource = function () {
}

DataSource.prototype.get = function (page) {
  return q.Promise(function (resolve) {
    request.get('http://image.so.com/zj?ch=photography&listtype=hot&sn=' + page * 30,
      function (error, response) {
        resolve(JSON.parse(response.body).list.map(function (item) {
          return {
            name: item.group_title,
            description: '标签：' + item.tag,
            aspect_ratio: item.cover_width / item.cover_height,
            image: {
              small: item.cover_imgurl,
              large: item.cover_imgurl
            }
          }
        }))
      }
    )
  })
}

module.exports = DataSource
