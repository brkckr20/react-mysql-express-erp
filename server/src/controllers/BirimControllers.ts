import { Handler } from 'express';
import { MySql } from "../db/db";
import { Birim, ResponseDatas, ResponseDataSuccessfully } from '../types/interfaces';
const mysql = new MySql();

export const BirimGetir : Handler = (req,res) => {
    mysql.connect();
    try {
        mysql.query("SELECT * FROM birim", [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result,
                message : "Birim listeleme işlemi başarılı."
            } as ResponseDatas)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}

export const BirimKaydet: Handler = (req, res) => {
    mysql.connect();
    try {
        const { BIRIM_ADI,KISA_KODU,DEPO_ADI,YENI_KAYITMI}: Birim = req.body;
        if (YENI_KAYITMI) {
            const sorgu = `INSERT INTO birim 
                    (AD,KISA_KOD,DEPO)
                    VALUES (
                        '${BIRIM_ADI}',
                        '${KISA_KODU}',
                        '${DEPO_ADI}'
                    )`;        
        mysql.query(sorgu, [], (error, result, fields) => {
            if (error) {
                console.log(error);
                return;
            }
            res.send({
                code: 200,
                message :"Birim kayıt işlemi başarılı."
            } as ResponseDataSuccessfully)
        })
        } else {
            //GÜNCELLEME KODLARI GELİCEK
        }
    } catch (error) {
        console.log(error);
        
    }
    mysql.close();
}