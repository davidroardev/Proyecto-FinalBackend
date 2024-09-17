import pool from "../database/db_coneccion"
import { Request, response, Response } from "express";
import { Query, QueryResult } from "pg";

/**
 * Get All Data of Categories Table.
 * @param req 
 * @param res 
 * @returns auto
 */
export const getAutos = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const response: QueryResult = await pool.query('SELECT * FROM autos ORDER BY auto_id;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

/**
 * Get All Data of Categories Table by id.
 * @param req 
 * @param res 
 * @returns auto
 */
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

/**
 * create data on the table 
 * @param req 
 * @param res 
 * @returns auto
 */

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
};

/**
 * delete Data of Categories Table by id.
 * @param req 
 * @param res 
 * @returns auto
 */

export const deleteAuto = async (req:Request,res:Response): Promise<Response> =>{
    const id = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM autos WHERE auto_id = $1',[id]);

        return res.status(200).json(`The auto ${id} was deleted successfully`);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
}

/**
 * update Data of Categories Table by id.
 * @param req 
 * @param res 
 * @returns auto
 */

export const updateAutos = async (req:Request,res:Response): Promise<Response> =>{
    const id =parseInt(req.params.id);
    const {makeAuto,modelAuto,yearAuto,priceAuto,colorAuto}= req.body;
    try {
        await pool.query ('UPDATE autos SET make =$1, model= $2,year = $3 , price = $4, color= $5 WHERE auto_id = $6',
            [makeAuto,modelAuto,yearAuto,priceAuto,colorAuto, id]
        );
        return res.json({
            message:'Auto updated successfully',
            auto:{
            id, 
            makeAuto,
            modelAuto,
            yearAuto,
            priceAuto,
            colorAuto
            }
            
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }

}