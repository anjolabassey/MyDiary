/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import routes from '../routes/routes';
import server from '../index';
import entries from '../controllers/entries';

const should = chai.should();

chai.use(chaiHttp);

// https://ubuverse.com/introduction-to-node-js-api-unit-testing-with-mocha-and-chai/
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
describe('Entries', () => {
  describe('/POST entries', () => {
    it('it should not POST an entry with empty fields', (done) => {
      chai
        .request('http://localhost:4000/v1')
        .post('/entries')
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should POST an entry successfully', (done) => {
      const entry = {
        title: 'today',
        body: 'i met a unicorn',
        id: 100
      };
      chai
        .request('http://localhost:4000/v1')
        .post('/entries')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('/GET entries', () => {
    it('it should GET all the entries', (done) => {
      chai
        .request('http://localhost:4000/v1')
        .get('/entries')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/GET/:id entries', () => {
    it('it should GET an entry by the given id', (done) => {
      const entry = {
        title: 'today',
        body: 'i met a unicorn',
        id: 100
      };
      chai
        .request('http://localhost:4000/v1')
        .get(`/entries/${entry.id}`)
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          done();
        });
    });

    it('it should return status 404 when entry not found', (done) => {
      const entry1 = { title: 'I met a lemon', body: 'he was very tart', id: 'fake' };
      chai
        .request('http://localhost:4000/v1')
        .get(`/entries/${entry1.id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/PUT/:id entries', () => {
    it('it should Update an entry by the given id', (done) => {
      const entry = {
        title: 'today',
        body: 'i met a unicorn'
      };
      const entry1 = {
        title: 'I met a lemon',
        body: 'he was very tart',
        id: 100
      };
      chai
        .request('http://localhost:4000/v1')
        .put(`/entries/${entry1.id}`)
        .send(entry1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('body');      
          done();
        });
    });
  });

  describe('/DELETE/:id entries', () => {
    it('it should DELETE an entry by the given id', (done) => {
      const entry = {
        title: 'today',
        body: 'i met a unicorn',
        id: 100
      };
      chai
        .request('http://localhost:4000/v1')
        .delete(`/entries/${entry.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Entry successfully deleted');
          done();
        });
    });
  });
});