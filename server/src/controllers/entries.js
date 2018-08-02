import { db, client } from '../models/database';


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
    if (!title || !body) {
      return res.status(400).json({ message: 'Please enter missing fields' });
    } else if (title === 'true' || title === 'false') {
      return res.status(400).json({ message: 'Booleans cannot be entered' });
    } else if (body === 'true' || body === 'false') {
      return res.status(400).json({ message: 'Booleans cannot be entered' });
    } else {
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
          entry: resp.rows
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
  getOne(req, res) {
    const id = Number(req.params.id);
    client.query(`SELECT * FROM entries WHERE id=${id}`, (err, resp) => {
      if (err) {
        return res.status(404).json({ message: 'Entry not found' });
      } else if (resp.rowCount === 0) {
        return res.status(400).json({ message: 'Entry does not exist' });
      } else {
        return res.send(resp.rows);
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
  modifyOne(req, res) {
    const id = Number(req.params.id);
    const { title, body } = req.body;
    client.query(`UPDATE entries SET title = $1, body = $2, last_updated = NOW() WHERE id = ${id}`, [title, body], (err, resp) => {
      if (err) {
        return res.status(400).json({ message: 'Entry does not exist' });
      } else if (resp.rowCount === 0) {
        return res.status(404).json({ message: 'Entry not found' });
      } else {
        return res.status(200).json({ message: 'Entry successfully updated' });
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
  deleteOne(req, res) {
    const id = Number(req.params.id);
    client.query(`DELETE FROM entries WHERE id=${id}`, (err, resp) => {
      if (err) {
        return res.status(400).send(err);
      } else if (resp.rowCount === 0) {
        return res.status(404).json({ message: 'Entry not found' });
      } else {
        return res.json({
          message: 'Entry successfully deleted'
        });
      }
    });
  }
}

export default new Entrycontroller();