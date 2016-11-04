'use strict'

const _ = require('underscore')

module.exports = function (options) {

  options = options || {}

  options.uptime = options.uptime || function () {
      return {uptime: process.uptime()};
    };

  options.build = options.build || function () {
      return {build: process.env.BUILD_NO || "n/a"};
    };

  options.environment = options.environment || function () {
      return {environment: process.env.NODE_ENV || "n/a"};
    };

  let result = {}
  if (typeof(options.mongoose) == 'function') {
    result = _.extend(result, options.mongoose())
  }
  if (typeof(options.test) == 'function') {
    result = _.extend(result, options.test())
  }

  result = _.extend(result, options.uptime())
  result = _.extend(result, options.build())
  result = _.extend(result, options.environment())

  return function (req, res, next) {
    res.status(200).json(result)
  }
}
