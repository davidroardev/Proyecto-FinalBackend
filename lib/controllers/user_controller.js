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
exports.createUser = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_coneccion_1 = __importDefault(require("../database/db_coneccion"));
require('dotenv').config();
const generateToken = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const password = req.body.password;
    const query = yield db_coneccion_1.default.query('SELECT * FROM users WHERE user_name = $1 AND password = $2', [userName, password]);
    const user = query.rows[0];
    if (query.rowCount !== null && query.rowCount > 0) {
        const accessToken = jsonwebtoken_1.default.sign(user, `${process.env.CLAVE_JWT}`, { expiresIn: '1h' });
        return response.status(200).json({ accessToken });
    }
    else {
        return response.status(400).json('User Not found');
    }
});
exports.generateToken = generateToken;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, firstName, PhoneNumber, lastName, email } = req.body;
    if (userName !== null && password !== null && email !== null) {
        try {
            yield db_coneccion_1.default.query('INSERT INTO users (user_name, password, first_name, phone_number,last_name,email) values($1,$2,$3,$4,$5,$6)', [userName, password, firstName, PhoneNumber, lastName, email]);
            return res.status(201).json({
                message: "User Created Successfully",
                user: {
                    userName,
                    password,
                    firstName,
                    PhoneNumber,
                    lastName,
                    email
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
exports.createUser = createUser;
