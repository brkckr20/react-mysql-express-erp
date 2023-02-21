import { Handler } from 'express';
import { MySql } from "../db/db";
import { ResponseDataSuccessfully } from '../types/interfaces';
const mysql = new MySql();

export const UlkeGetir : Handler = (req,res) => {
    mysql.connect();
    try {
        mysql.query("SELECT * FROM ulke", [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result,
                message : "Ülke listeleme işlemi başarılı."
            } as ResponseDataSuccessfully)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}