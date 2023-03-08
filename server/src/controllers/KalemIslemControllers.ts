import { Handler } from 'express';
import { MySql } from "../db/db";
import { ResponseDatas, KalemIslem } from '../types/interfaces';
const mysql = new MySql();

export const KalemIslemGetir : Handler = (req,res) => {
    mysql.connect();
    try {
        mysql.query("SELECT * FROM kalem_islem", [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result
            } as ResponseDatas)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}
