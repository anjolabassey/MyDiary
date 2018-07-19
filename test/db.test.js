/*eslint-disable*/
var assert = require('assert');
var db = require('../server/src/db');

var entry = {
  'Title': 'Today',
  'Body': 'I had a good day'
};

describe('Array Operations', () => {
  describe('#addOne()', () => {
    it('should return the size plus one after addition', () => {
      assert.equal(db.addOne(entry), db.database.length++);
    });
  });

  describe('#getAll()', () => {
    it('should return the all the content of the database ', () => {
      assert.equal(db.getAll(), db.database);
    });
  });

  describe('#getOne()', () => {
    it('should return the entry with the same id', () => {
      assert.equal(db.getOne(entry.id), entry);
    });
  });

  describe('#modifyOne()', () => {
    it('should return the updated value of the entry', () => {
      assert.equal(db.modifyOne(entry), entry);
    });
  });

  describe('#deleteOne()', () => {
    it('should return the size minus one after deletion', () => {
      assert.equal(db.deleteOne(entry.id).length, db.database.length--);
    });
  });
});

