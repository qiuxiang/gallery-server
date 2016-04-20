var util = require('util')
var Base = require('./base')

function DataSource() {
  this.listField = 'data'
}

util.inherits(DataSource, Base)

DataSource.prototype.getUrl = function (page) {
  return 'https://marketplace.500px.com/api/photos?sort=licensed_at&per_page=30&page=' + (page + 1)
}

DataSource.prototype.fieldsMap = function (item) {
  return {
    name: item.name,
    description: item.description,
    width: item.width,
    height: item.height,
    url: {
      small: item.images[2].url,
      large: item.images[6].url
    }
  }
}

module.exports = DataSource
