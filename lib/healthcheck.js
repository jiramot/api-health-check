'use strict'

const _ = require('underscore')

module.exports = function (options) {

  options = options || {}

  options.uptime = options.uptime || function () {
      return {uptime: process.uptime()};
    };


  let result = {}
  if (typeof(options.mongoose) == 'function') {
    result = _.extend(result, options.mongoose())
  }
  if (typeof(options.test) == 'function') {
    result = _.extend(result, options.test())
  }

  result = _.extend(result, options.uptime())
  return function (req, res, next) {
    res.status(200).json(result)
  }
}
