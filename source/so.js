var util = require('util')
var Base = require('./base')

function DataSource() {
  this.listField = 'list'
}

util.inherits(DataSource, Base)

DataSource.prototype.getUrl = function (page) {
  return 'http://image.so.com/zj?ch=photography&listtype=hot&sn=' + page * 30
}

DataSource.prototype.fieldsMap = function (item) {
  return {
    name: item.group_title,
    description: '标签：' + item.tag,
    width: parseInt(item.cover_width),
    height: parseInt(item.cover_height),
    photo: {
      small: item.cover_imgurl,
      large: item.cover_imgurl
    }
  }
}

module.exports = DataSource
