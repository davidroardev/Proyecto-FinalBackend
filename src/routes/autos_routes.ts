import { Router } from "express";
import { createAutos, deleteAuto, getAutos, getAutosById, updateAutos } from "../controllers/autos_controller";
import { authenticateToken } from "../middleware/authorization";


export const autosRoutes = Router ();

autosRoutes.get('/getautos',authenticateToken, getAutos);
autosRoutes.get('/getautosbyid/:id',authenticateToken, getAutosById);
autosRoutes.post('/createautos',authenticateToken, createAutos);
autosRoutes.delete('/deleteautos/:id',authenticateToken , deleteAuto);
autosRoutes.put('/updateauto/:id',authenticateToken , updateAutos)