/*eslint-disable*/
let routes = require('../server/src/routes/routes');
let db = require('../server/src/db');

let { address } = require('../server/src/index');


let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Entries', () => {

    describe('/POST entries', () => {
        it('it should not POST an entry without body field', (done) => {
            let entry = {
                title: 'I met a lemon',
                body: 'he was very tart'
            }
            chai.request('http://localhost:4000/v1')
            .post('/entries')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('error');
            done();
            });
        });
    });

    describe('/GET entries', () => {
        it('it should GET all the entries', (done) => {
            chai.request('http://localhost:4000/v1')
            .get('/entries')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            done();
            });
        });
    });

    describe('/GET/:id entries', () => {
        it('it should GET an entry by the given id', (done) => {
            let entry = { title: 'I met a lemon', body: 'he was very tart' };
            db.getOne('entry');
            chai.request('http://localhost:4000/v1')
            .get('/entries' + entry.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
            done();
            });
        });
    });
    
});
