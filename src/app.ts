import express, { response, Router,} from "express";
import { userRoutes } from "./routes/user_routes";
import { autosRoutes } from "./routes/autos_routes";

require('dotenv').config();

const app = express();
const port = process.env.EXPRESS_PORT;

app.use(express.json())

app.use(autosRoutes);
app.use (userRoutes);
app.listen(port, () => {
    console.log(`Proyecto final app listening on port ${port}`)
  })