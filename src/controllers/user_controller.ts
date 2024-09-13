import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
require('dotenv').config();

export const generateToken = (req:Request,  res:Response): Response =>{
    const userName = req.body.username; 
    const password = req.body.password;
    const user = {name: userName, password:password};
    const accessToken = jwt.sign(user, `${process.env.CLAVE_JWT}`, {expiresIn:'1h'});
    return res.status(200).json({accessToken});
};

