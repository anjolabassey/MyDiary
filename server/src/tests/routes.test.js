/* eslint-env mocha */
// I used followed the tutorials below to write my test
// https://ubuverse.com/introduction-to-node-js-api-unit-testing-with-mocha-and-chai/
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
// https://blog.khophi.co/mocha-chai-chai-http-test-express-api-auth-endpoints/

import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import routes from '../routes/routes';
import app from '../index';
import {
  createEntryTable, createUserTable, deleteEntryTable, deleteUserTable 
} from '../models/schema';
import entryController from '../controllers/entries';
import { db, client } from '../models/database';


deleteEntryTable();
deleteUserTable();
createUserTable();
createEntryTable();


let should = chai.should();
chai.use(chaiHttp);

let token;
let userId;

const newUser = {
  email: 'oyinye@yahoo.com',
  password: 'hopelfully',
  username: 'oyin'
};
const existingUser = {
  email: 'oyinye@yahoo.com',
  password: 'hopelfully',
};

describe('mydiary API endpoint', () => {
  describe('/POST users API', () => {
    it('should register a user sucessfully', (done) => {
      chai
        .request('http://localhost:4000/api/v1')
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/POST users API', () => {
    it('should sign a user in sucessfully and generate token', (done) => {
      chai
        .request('http://localhost:4000/api/v1')
        .post('/auth/signin')
        .send(existingUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          token  = res.body.token;
          done();
        });
    });
  });

  describe('/POST entries API', () => {
    it('should not POST an entry with empty fields', (done) => {
      chai
        .request('http://localhost:4000/api/v1')
        .post('/entries')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should POST an entry successfully', (done) => {
      const entry = {
        title: 'today',
        body: 'i met a unicorn'
      };
      chai
        .request('http://localhost:4000/api/v1')
        .post('/entries')
        .set('x-access-token', token)
        .send(entry)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Entry successfully added');
          
          done();
        });
    });
  });

  describe('/GET entries API', () => {
    it('should GET all the entries', (done) => {
      chai
        .request('http://localhost:4000/api/v1')
        .get('/entries')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          done();
        });
    });
  });

  describe('/GET/:id entries API', () => {
    it('should GET an entry by the given id', (done) => {
      const entry = {
        title: 'today',
        body: 'i met a unicorn'
      };
      chai
        .request('http://localhost:4000/api/v1')
        .get('/entries/')
        .set('x-access-token', token)
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          done();
        });
    });

    it('should return status 404 when entry not found', (done) => {
      const entry1 = { id: 'fake', title: 'I met a lemon', body: 'he was very tart' };
      chai
        .request('http://localhost:4000/api/v1')
        .get(`/entries/${entry1.id}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/PUT/:id entries API', () => {
    it(' should Update an entry by the given id', (done) => {
      const entry = {
        id: 1,
        title: 'today',
        body: 'i met a unicorn'
      };
      const entry1 = {
        title: 'I met a lemon',
        body: 'he was very tart'
      };
      chai
        .request('http://localhost:4000/api/v1')
        .put(`/entries/${entry.id}`)
        .set('x-access-token', token)
        .send(entry1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('entry');
          done();
        });
    });
  });

  describe('/DELETE/:id entries API', () => {
    it('it should DELETE an entry by the given id', (done) => {
      const entry = {
        id: 1,
        title: 'today',
        body: 'i met a unicorn'
      };
      chai
        .request('http://localhost:4000/api/v1')
        .delete(`/entries/${entry.id}`)
        .set('x-access-token', token)
        .end((err, res) => {
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