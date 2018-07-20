import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import routes from './routes/routes';

const port = process.env.port || 4000;

// setup express app
const app = express();

// setup  server
app.server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({
  message: 'Welcome to MyDiary'
}));

// api routes
app.use('/v1/entries', routes);


// listen for requests
app.server.listen(port, () => {
  console.log(`Started on port ${port}`);
});


export default app;