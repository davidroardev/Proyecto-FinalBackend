"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAutos = exports.deleteAuto = exports.createAutos = exports.getAutosById = exports.getAutos = void 0;
const db_coneccion_1 = __importDefault(require("../database/db_coneccion"));
/**
 * Get All Data of Categories Table.
 * @param req
 * @param res
 * @returns auto
 */
const getAutos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_coneccion_1.default.query('SELECT * FROM autos ORDER BY auto_id;');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getAutos = getAutos;
/**
 * Get All Data of Categories Table by id.
 * @param req
 * @param res
 * @returns auto
 */
const getAutosById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield db_coneccion_1.default.query('SELECT * FROM autos WHERE auto_id = $1', [id]);
        return res.json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getAutosById = getAutosById;
/**
 * create data on the table
 * @param req
 * @param res
 * @returns auto
 */
const createAutos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { autoId, makeAuto, modelAuto, yearAuto, priceAuto, colorAuto } = req.body;
    if (autoId !== null && makeAuto !== null && priceAuto !== null) {
        try {
            yield db_coneccion_1.default.query('INSERT INTO autos (auto_id, make, model, year, price, color) values($1,$2,$3,$4,$5,$6)', [autoId, makeAuto, modelAuto, yearAuto, priceAuto, colorAuto]);
            return res.status(201).json({
                message: "Auto Created Successfully",
                auto: {
                    autoId,
                    makeAuto,
                    modelAuto,
                    yearAuto,
                    priceAuto,
                    colorAuto,
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    }
    else {
        return res.status(500).json('Internal Server Error');
    }
});
exports.createAutos = createAutos;
/**
 * delete Data of Categories Table by id.
 * @param req
 * @param res
 * @returns auto
 */
const deleteAuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield db_coneccion_1.default.query('DELETE FROM autos WHERE auto_id = $1', [id]);
        return res.status(200).json(`The auto ${id} was deleted successfully`);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.deleteAuto = deleteAuto;
/**
 * update Data of Categories Table by id.
 * @param req
 * @param res
 * @returns auto
 */
const updateAutos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { makeAuto, modelAuto, yearAuto, priceAuto, colorAuto } = req.body;
    try {
        yield db_coneccion_1.default.query('UPDATE autos SET make =$1, model= $2,year = $3 , price = $4, color= $5 WHERE auto_id = $6', [makeAuto, modelAuto, yearAuto, priceAuto, colorAuto, id]);
        return res.json({
            message: 'Auto updated successfully',
            auto: {
                id,
                makeAuto,
                modelAuto,
                yearAuto,
                priceAuto,
                colorAuto
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.updateAutos = updateAutos;
