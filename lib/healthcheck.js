'use strict'

module.exports = function () {

  return function(req, res, next){
    let result = { uptime: process.uptime() }
    res.status(200).json(result)
  }
}
