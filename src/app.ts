import express, { response } from "express";

require('dotenv').config();

const app = express();
const port = process.env.EXPRESS_PORT;

app.get('/', (req,res) => {
    res.send('Hola Mundo ')
});

app.listen(port, () => {
    console.log(`Proyecto final app listening on port ${port}`)
  })