import { Router } from "express";
import { createAutos, getAutos, getAutosById } from "../controllers/autos_controller";

export const autosRoutes = Router ();

autosRoutes.get('/getautos', getAutos);
autosRoutes.get('/getautosbyid/:id', getAutosById);
autosRoutes.post('/createautos', createAutos);