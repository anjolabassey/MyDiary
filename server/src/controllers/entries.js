import { db, client } from '../models/database';

/**
 * @export
 * @class Entrycontroller
 */
export default class Entrycontroller {
/**
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} return object response or error
 * @memberof Entrycontroller
 */
  static addOne(req, res) {
    const { title, body } = req.body;
    if (!title || !body) {
      res.status(400).json({ message: 'Please enter missing fields' });
    } else if (title === 'true' || title === 'false') {
      res.status(400).json({ message: 'Booleans cannot be entered' });
    } else if (body === 'true' || body === 'false') {
      res.status(400).json({ message: 'Booleans cannot be entered' });
    } else {
      client.query('INSERT INTO entries (title, body, last_updated) VALUES ( $1, $2, NOW()) RETURNING *', [title, body], (err, resp) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json({
            message: 'Entry successfully added',
            entry: resp.row
          });
        }
      });
    }
  }

  /**
 * @static
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} return object response or error
 * @memberof Entrycontroller
 */
  static getAll(req, res) {
    client.query('SELECT * FROM entries', (err, resp) => {
      if (err) {
        res.send(err);
      } else if (resp.rowCount === 0) {
        res.status(404).json({ message: 'There are no entries yet' });
      } else {
        res.send(resp.rows);
      }
    });
  }

  /**
 * @static
 * @param {*} req
 * @param {*} res
 * @returns {obj} return object response or error
 * @memberof Entrycontroller
 */
  static getOne(req, res) {
    const id = Number(req.params.id);
    client.query(`SELECT * FROM entries WHERE id=${id}`, (err, resp) => {
      if (err) {
        res.status(404).json({ message: 'Entry not found' });
      } else if (resp.rowCount === 0) {
        res.status(404).json({ message: 'Entry not found' });
      } else {
        res.send(resp.rows);
      }
    });
  }

  /**
 * @static
 * @param {*} req
 * @param {*} res
 * @returns {obj} return object response or error
 * @memberof Entrycontroller
 */
  static modifyOne(req, res) {
    const id = Number(req.params.id);
    const { title, body } = req.body;
    client.query(`UPDATE entries SET title = $1, body = $2, last_updated = NOW() WHERE id = ${id}`, [title, body], (err, resp) => {
      if (err) {
        res.status(400).json({ message: 'Entry does not exist' });
      } else if (resp.rowCount === 0) {
        res.status(404).json({ message: 'Entry not found' });
      } else {
        res.status(200).json({ message: 'Entry successfully updated' });
      }
    });
  }

  /**
 * @static
 * @param {*} req
 * @param {*} res
 * @memberof Entrycontroller
 */
  static deleteOne(req, res) {
    const id = Number(req.params.id);
    client.query(`DELETE FROM entries WHERE id=${id}`, (err, resp) => {
      if (err) {
        res.status(404).send(err);
      } else if (resp.rowCount === 0) {
        res.status(404).json({ message: 'Entry not found' });
      } else {
        res.json({
          message: 'Entry successfully deleted'
        });
      }
    });
  }
}
