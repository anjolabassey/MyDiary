'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require('../models/database');

var _schema = require('../models/schema');

var _entryValidation = require('../helpers/entryValidation');

var _entryValidation2 = _interopRequireDefault(_entryValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _schema.createUserTable)();
(0, _schema.createEntryTable)();

/**
 * @export
 * @class Entrycontroller
 */

var Entrycontroller = function () {
  function Entrycontroller() {
    _classCallCheck(this, Entrycontroller);
  }

  _createClass(Entrycontroller, [{
    key: 'addEntry',

    /**
     * Posts a new entry to the database
     *
     * @param {object} req
     * @param {object} res
     *
     * @returns {object} return object response or error
     *
     * @memberof Entrycontroller
     */
    value: function addEntry(req, res) {
      var _req$body = req.body,
          title = _req$body.title,
          body = _req$body.body;

      _database.client.query('INSERT INTO entries (title, body, last_updated, user_id) VALUES ( $1, $2, NOW(), $3) RETURNING *', [title, body, req.body.decoded.sub], function (err, resp) {
        if (err) {
          return res.status(400).json({
            status: 'Failed',
            message: 'Entry was not posted'
          });
        } else {
          return res.status(201).json({
            status: 'Success',
            message: 'Entry successfully added',
            entry: resp.rows[0]
          });
        }
      });
    }

    /**
    * Gets all the entries from the database
    * @param {object} req
    * @param {object} res
    *
    * @returns {object} return object response or error
    *
    * @memberof Entrycontroller
    */

  }, {
    key: 'getAllEntries',
    value: function getAllEntries(req, res) {
      var userId = req.body.decoded.sub;
      _database.client.query('SELECT * FROM entries WHERE user_id=' + userId, function (err, resp) {
        if (err) {
          return res.status(404).json({
            status: 'Failed',
            message: err
          });
        } else if (resp.rowCount === 0) {
          return res.status(404).json({ message: 'You have don\'t have any entries yet' });
        } else {
          return res.status(200).json({
            status: 'Success',
            entries: resp.rows
          });
        }
      });
    }

    /**
    * Gets the contents of an entry with the id provided
    *
    * @param {object} req
    * @param {object} res
    *
    * @returns {object} return object response or error
    *
    * @memberof Entrycontroller
    */

  }, {
    key: 'getOneEntry',
    value: function getOneEntry(req, res) {
      var id = Number(req.params.id);
      var userId = req.body.decoded.sub;
      _database.client.query('SELECT * FROM entries WHERE id=' + id + ' AND user_id=' + userId, function (err, resp) {
        if (err) {
          return res.status(404).json({
            status: 'Failed',
            message: 'Entry not found'
          });
        } else if (resp.rowCount === 0) {
          return res.status(400).json({
            status: 'Failed',
            message: 'Entry does not exist'
          });
        } else {
          return res.status(200).json({
            status: 'Success',
            entry: resp.rows
          });
        }
      });
    }

    /**
    * Changes the content of an existing entry with the corresponding id
    *
    * @param {object} req
    * @param {object} res
    *
    * @returns {object} success object or error object
    *
    * @memberof Entrycontroller
    */

  }, {
    key: 'modifyEntry',
    value: function modifyEntry(req, res) {
      var id = Number(req.params.id);
      var _req$body2 = req.body,
          title = _req$body2.title,
          body = _req$body2.body;

      var userId = req.body.decoded.sub;
      _database.client.query('UPDATE entries SET title = $1, body = $2, last_updated = NOW() WHERE id = ' + id + ' AND user_id=' + userId + ' RETURNING *', [title, body], function (err, resp) {
        if (err) {
          return res.status(400).json({
            status: 'Failed',
            message: 'Entry does not exist'
          });
        } else if (resp.rowCount === 0) {
          return res.status(404).json({
            status: 'Failed',
            message: 'Entry not found'
          });
        } else {
          return res.status(200).json({
            status: 'Success',
            message: 'Entry successfully updated',
            entry: resp.rows[0]
          });
        }
      });
    }

    /**
    * Deletes the entry with corresponding id
    *
    * @param {object} req
    * @param {object} res
    *
    * @returns {object} success object or error object
    *
    * @memberof Entrycontroller
    */

  }, {
    key: 'deleteEntry',
    value: function deleteEntry(req, res) {
      var id = Number(req.params.id);
      var userId = req.body.decoded.sub;
      _database.client.query('DELETE FROM entries WHERE id=' + id + ' AND user_id = ' + userId, function (err, resp) {
        if (err) {
          return res.status(400).json({
            status: 'Failed',
            message: 'Entry does not exist'
          });
        } else if (resp.rowCount === 0) {
          return res.status(404).json({
            status: 'Failed',
            message: 'Entry not found'
          });
        } else {
          return res.json({
            status: 'Success',
            message: 'Entry successfully deleted'
          });
        }
      });
    }
  }]);

  return Entrycontroller;
}();

exports.default = new Entrycontroller();
//# sourceMappingURL=entries.js.map