import express, { response, Router,} from "express";
import { getAutos } from "./controllers/autos_controller";

require('dotenv').config();

const app = express();
const port = process.env.EXPRESS_PORT;

const autosRoutes = Router();

autosRoutes.get('/getautos', getAutos);

app.use(autosRoutes);

app.listen(port, () => {
    console.log(`Proyecto final app listening on port ${port}`)
  })