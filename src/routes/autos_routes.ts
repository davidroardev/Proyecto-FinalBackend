import { Router } from "express";
import { createAutos, deleteAuto, getAutos, getAutosById, updateAutos } from "../controllers/autos_controller";

export const autosRoutes = Router ();

autosRoutes.get('/getautos', getAutos);
autosRoutes.get('/getautosbyid/:id', getAutosById);
autosRoutes.post('/createautos', createAutos);
autosRoutes.delete('/deleteautos/:id' , deleteAuto);
autosRoutes.put('/updateauto/:id', updateAutos)