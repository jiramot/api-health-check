var chai = require('chai')
chai.should()

var sinon = require('sinon')
chai.use(require('sinon-chai'))

var healthcheck = require('../lib/healthcheck')

describe('api-health-check', function () {

  it('exports a function', function () {
    healthcheck.should.be.a('function')
  })

  describe('middleware', function () {

    var req, res, next

    beforeEach(function () {
      req = {}
      res = {
        json: sinon.stub(),
        status: sinon.stub()
      }
      res.status.returns(res)
      next = sinon.stub()
      sinon.stub(process, 'uptime').returns(100)
    })

    afterEach(function () {
      process.uptime.restore()
    })

    it('returns a middleware', function () {
      healthcheck().should.be.a('function')
      healthcheck().length.should.equal(3)
    })

    it('responds with json', function () {
      healthcheck()(req, res, next)
      res.json.should.have.been.calledOnce
    })

    it('responds with 200 status', function () {
      healthcheck()(req, res, next)
      res.status.should.have.been.calledWith(200)
    })

    // it('responds with process uptime as body', function () {
    //   healthcheck()(req, res, next)
    //   res.status.should.have.been.calledBefore(res.json)
    //   res.json.should.have.been.calledWith({uptime: 100})
    // })

    describe('With options', function () {
      it('should return 200 when inject an options', function () {
        healthcheck({
          mongoose: function () {
            return {mongoose: true};

          }
        })(req, res, next)
        res.status.should.have.been.calledBefore(res.json)
      })

    })
  })


  it('integrates with an express server', function (done) {
    var app = require('express')()
    var request = require('supertest')
    app.use('/healthcheck', healthcheck())
    process.env.VERSION=1
    process.env.NODE_ENV="TEST"
    request(app)
      .get('/healthcheck')
      .expect(200)
      .expect(function (res) {
        console.log(res.body)
        res.body.should.have.property('uptime')
        res.body.should.have.property('environment')
        res.body.should.have.property('build')
      })
      .end(done)
  })

})
