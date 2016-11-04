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
      console.log("env")
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
  console.log("af uptime")
  console.log(result)
  result = _.extend(result, options.build())
  console.log("af ver")
  console.log(result)
  result = _.extend(result, options.environment())
  console.log("af env")
  console.log(result)

  return function (req, res, next) {
    res.status(200).json(result)
  }
}
