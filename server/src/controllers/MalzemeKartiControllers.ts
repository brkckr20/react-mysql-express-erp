import { Handler } from 'express';
import { MySql } from "../db/db";
import { MalzemeKarti, ResponseDatas } from '../types/interfaces';
const mysql = new MySql();

export const MalzemeKartiGetir: Handler = async (req, res) => {
    mysql.connect();
    try {
        mysql.query("SELECT * FROM malzeme_karti",[],(error, results , fields) => {
            if (error) {
            console.error(error);
            return;
            }
            res.send({
                data: results,
                code: 200,
                message: "Veri getirme işlemi başarıyla gerçekleştirildi"
            } as ResponseDatas);
        })
    } catch (error) {
    }
    mysql.close();
    
}

export const MalzemeKartiKaydet: Handler = (req, res) => {
    mysql.connect();
    const {MALZEME_KODU,MALZEME_ADI,BIRIM,TEDARIKCI_KODU,TEDARIKCI_ADI,PASIF,MALZEME_GRUP,MALZEME_MARKA}: MalzemeKarti = req.body;
    try {
        const sorgu = `INSERT INTO malzeme_karti 
                    (MALZEME_KODU,MALZEME_ADI, BIRIM, TEDARIKCI_KODU, TEDARIKCI_ADI, PASIF, MALZEME_GRUP, MALZEME_MARKA)
                    VALUES (
                        '${MALZEME_KODU}',
                        '${MALZEME_ADI}',
                        '${BIRIM}',
                        '${TEDARIKCI_KODU}',
                        '${TEDARIKCI_ADI}',
                        '${PASIF}',
                        '${MALZEME_GRUP}',
                        '${MALZEME_MARKA}'
                    )`
    mysql.query(sorgu, [],function (err) {
        if (err) throw err;
        console.log("veri girildi");
    })
    } catch (error) {
        
    }
    
}