import { NextFunction, Request, response, Response } from "express"
import jwt from "jsonwebtoken"
import pool from "../database/db_coneccion";
require('dotenv').config();

export const generateToken = async (req: Request, response:Response): Promise<Response> => {
    const userName = req.body.userName;
    const password = req.body.password;
    const query = await pool.query('SELECT * FROM users WHERE user_name = $1 AND password = $2', [userName, password]);
    const user = query.rows[0];
    if (query.rowCount !== null  && query.rowCount > 0){
        const accessToken = jwt.sign(user, `${process.env.CLAVE_JWT}`, {expiresIn: '1h'});
        return response.status(200).json({accessToken});
    } else {
        return response.status(400).json('User Not found');
    }
};

export const createUser = async (req:Request ,res:Response): Promise <Response> =>{
    const {userName,password, firstName,PhoneNumber,lastName,email}= req.body;
    if (userName !==null && password !==null && email !==null){
        try {
            await pool.query('INSERT INTO users (user_name, password, first_name, phone_number,last_name,email) values($1,$2,$3,$4,$5,$6)',
                    [userName,password, firstName,PhoneNumber,lastName,email]
                );
                return res.status(201).json({
                    message: "User Created Successfully",
                    user:{
                        userName,
                        password, 
                        firstName,
                        PhoneNumber,
                        lastName,
                        email
                    }
                });
        } catch (error) {
            console.error(error);
                return res.status(500).json('Internal Server Error');
        }
    }else{
        return res.status(500).json('Internal Server Error');
    }
};

