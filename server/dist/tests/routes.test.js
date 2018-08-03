'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _routes = require('../routes/routes');

var _routes2 = _interopRequireDefault(_routes);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _schema = require('../models/schema');

var _entries = require('../controllers/entries');

var _entries2 = _interopRequireDefault(_entries);

var _database = require('../models/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
// I used followed the tutorials below to write my test
// https://ubuverse.com/introduction-to-node-js-api-unit-testing-with-mocha-and-chai/
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
// https://blog.khophi.co/mocha-chai-chai-http-test-express-api-auth-endpoints/

(0, _schema.deleteEntryTable)();
(0, _schema.deleteUserTable)();
(0, _schema.createUserTable)();
(0, _schema.createEntryTable)();

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

var token = void 0;
var userId = void 0;

var newUser = {
  email: 'oyinye@yahoo.com',
  password: 'hopelfully',
  username: 'oyin'
};
var existingUser = {
  email: 'oyinye@yahoo.com',
  password: 'hopelfully'
};

describe('mydiary API endpoint', function () {
  describe('/POST users API', function () {
    it('should register a user sucessfully', function (done) {
      _chai2.default.request('http://localhost:4000/api/v1').post('/auth/signup').send(newUser).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
    });
  });

  describe('/POST users API', function () {
    it('should sign a user in sucessfully and generate token', function (done) {
      _chai2.default.request('http://localhost:4000/api/v1').post('/auth/signin').send(existingUser).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
    });
  });

  describe('/POST entries API', function () {
    it('should not POST an entry with empty fields', function (done) {
      _chai2.default.request('http://localhost:4000/api/v1').post('/entries').end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should POST an entry successfully', function (done) {
      var entry = {
        title: 'today',
        body: 'i met a unicorn'
      };
      _chai2.default.request('http://localhost:4000/api/v1').post('/entries').set('x-access-token', token).send(entry).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Entry successfully added');

        done();
      });
    });
  });

  describe('/GET entries API', function () {
    it('should GET all the entries', function (done) {
      _chai2.default.request('http://localhost:4000/api/v1').get('/entries').set('x-access-token', token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('Success');
        done();
      });
    });
  });

  describe('/GET/:id entries API', function () {
    it('should GET an entry by the given id', function (done) {
      var entry = {
        title: 'today',
        body: 'i met a unicorn'
      };
      _chai2.default.request('http://localhost:4000/api/v1').get('/entries/').set('x-access-token', token).send(entry).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        done();
      });
    });

    it('should return status 404 when entry not found', function (done) {
      var entry1 = { id: 'fake', title: 'I met a lemon', body: 'he was very tart' };
      _chai2.default.request('http://localhost:4000/api/v1').get('/entries/' + entry1.id).set('x-access-token', token).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });

  describe('/PUT/:id entries API', function () {
    it(' should Update an entry by the given id', function (done) {
      var entry = {
        id: 1,
        title: 'today',
        body: 'i met a unicorn'
      };
      var entry1 = {
        title: 'I met a lemon',
        body: 'he was very tart'
      };
      _chai2.default.request('http://localhost:4000/api/v1').put('/entries/' + entry.id).set('x-access-token', token).send(entry1).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('entry');
        done();
      });
    });
  });

  describe('/DELETE/:id entries API', function () {
    it('it should DELETE an entry by the given id', function (done) {
      var entry = {
        id: 1,
        title: 'today',
        body: 'i met a unicorn'
      };
      _chai2.default.request('http://localhost:4000/api/v1').delete('/entries/' + entry.id).set('x-access-token', token).end(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Entry successfully deleted');
          done();
        }
      });
    });
  });
});
//# sourceMappingURL=routes.test.js.map