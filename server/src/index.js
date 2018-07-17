
import express from 'express';

const port = process.env.port || 4000;

// setup express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


export default app;