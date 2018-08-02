import { db, client } from '../models/database';
import entryValidation from '../helpers/entryValidation';


/**
 * @export
 * @class Entrycontroller
 */
class Entrycontroller {
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
  addEntry(req, res) {
    const { title, body } = req.body;
    client.query('INSERT INTO entries (title, body, last_updated, user_id) VALUES ( $1, $2, NOW(), $3) RETURNING *', [title, body, req.body.decoded.sub], (err, resp) => {
      if (err) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Entry not found'
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
  getAllEntries(req, res) {
    const userId = req.body.decoded.sub;
    client.query(`SELECT * FROM entries WHERE user_id=${userId}`, (err, resp) => {
      if (err) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Entry not found'
        });
      } else if (resp.rowCount === 0) {
        return res.status(404).json({ message: 'You don"t have entries yet' });
      } else {
        console.log(resp.rows);
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
  getOneEntry(req, res) {
    const id = Number(req.params.id);
    const userId = req.body.decoded.sub;
    client.query(`SELECT * FROM entries WHERE id=${id} AND user_id=${userId}`, (err, resp) => {
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
  modifyOneEntry(req, res) {
    const id = Number(req.params.id);
    const { title, body } = req.body;
    const userId = req.body.decoded.sub;
    client.query(`UPDATE entries SET title = $1, body = $2, last_updated = NOW() WHERE id = ${id} AND user_id=${userId} RETURNING *`, [title, body], (err, resp) => {
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
  deleteOneEntry(req, res) {
    const id = Number(req.params.id);
    const userId = req.body.decoded.sub;
    client.query(`DELETE FROM entries WHERE id=${id} AND user_id = ${userId}`, (err, resp) => {
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
}

export default new Entrycontroller();