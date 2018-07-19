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
        it('it should not post an entry without body field', (done) => {
            let entry = {
                title: 'I met a lemon',
                body: 'he was very tart'
            }
            chai.request('http://localhost:4000/v1')
            .post('/entries')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
            done();
            });
        });
    });

    describe('/GET entries', () => {
        it('it should get all the entries', (done) => {
            chai.request('http://localhost:4000/v1')
            .get('/entries')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error');
            done();
            });
        });
    });
});
