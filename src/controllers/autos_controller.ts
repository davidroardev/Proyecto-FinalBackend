import pool from "../database/db_coneccion"
import { Request, Response } from "express";
import { QueryResult } from "pg";

export const getAutos = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const response: QueryResult = await pool.query('SELECT * FROM autos;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};