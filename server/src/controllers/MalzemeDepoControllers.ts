import { Handler } from 'express';
import { MySql } from "../db/db";
import { ResponseDatas, KalemIslem } from '../types/interfaces';
const mysql = new MySql();

export const MalzemeDepoGetir: Handler = (req, res) => {
    const {depoAdi} = req.params;    
    mysql.connect();
    try {
        if (depoAdi === 'giris') {
            mysql.query(`SELECT d1.ID,D1.TARIH,D1.FIRMA_KODU,D1.FIRMA_ADI,D1.FATURA_NO,d1.ACIKLAMA,d2.KALEM_ISLEM,d2.MALZEME_KODU,d2.MALZEME_ADI,d2.MIKTAR,d2.BIRIM,d2.NOT1,d2.NOT2,d2.NOT3
            FROM malzeme_depo1 d1 INNER JOIN malzeme_depo2 d2 on d1.ID = d2.REF_NO
            where d1.ISLEM_CINSI = 'MALZEME_GIRIS' AND d1.ID = (SELECT MAX(ID) from malzeme_depo1)
            ORDER BY D1.ID DESC`, [], (error, result, fields) => {
                if (error) {
                    console.log("error var");
                    return;
                }
                res.send({
                    code: 200,
                    data: result
                } as ResponseDatas)
            })
        }
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}
