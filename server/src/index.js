import express from 'express';
import bodyParser from 'body-parser';


const port = process.env.port || 4000;

// setup express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// listen for requests
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


export default app;