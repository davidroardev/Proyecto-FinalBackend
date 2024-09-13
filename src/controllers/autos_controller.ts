import pool from "../database/db_coneccion"
import { Request, response, Response } from "express";
import { Query, QueryResult } from "pg";

export const getAutos = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const response: QueryResult = await pool.query('SELECT * FROM autos;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

export const getAutosById = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    try {
        const response: QueryResult =await pool.query('SELECT * FROM autos WHERE auto_id = $1',[id]);
        return res.json(response.rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

export const createAutos = async (req:Request, res:Response): Promise<Response> =>{
    const {autoId,makeAuto,modelAuto,yearAuto,priceAuto,colorAuto} = req.body;

    if (autoId !== null && makeAuto !== null && priceAuto !==null ){
        try {
            await pool.query('INSERT INTO autos (auto_id, make, model, year, price, color) values($1,$2,$3,$4,$5,$6)',
                [autoId,makeAuto,modelAuto,yearAuto,priceAuto,colorAuto]
            );
            return res.status(201).json({
                message: "Auto Created Successfully",
                auto:{
                    autoId,
                    makeAuto,
                    modelAuto,
                    yearAuto,
                    priceAuto,
                    colorAuto,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    }else{
        
        return res.status(500).json('Internal Server Error');
    }
}