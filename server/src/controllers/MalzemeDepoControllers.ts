import { Handler } from 'express';
import { MySql } from "../db/db";
import { ResponseDatas, KalemIslem, ResponseDataSuccessfully, MalzemeDepo } from '../types/interfaces';
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

export const MalzemeDepoOncekiKayitGetir: Handler = (req, res) => {
    const { id, tip } = req.params;
    mysql.connect();
    try {
        switch (tip) {
            /* malzeme deponun girişi önceki kayıtların listelenmesi */
            case "giris":
                mysql.query(`SELECT d1.ID,D1.TARIH,D1.FIRMA_KODU,D1.FIRMA_ADI,D1.FATURA_NO,d1.ACIKLAMA,d2.KALEM_ISLEM,d2.MALZEME_KODU,d2.MALZEME_ADI,d2.MIKTAR,d2.BIRIM
                FROM malzeme_depo1 d1 INNER JOIN malzeme_depo2 d2 on d1.ID = d2.REF_NO
                where d1.ISLEM_CINSI = 'MALZEME_GIRIS' AND d1.ID = (SELECT MAX(ID) from malzeme_depo1 WHERE ID < ${id})
                ORDER BY D1.ID DESC;
            `, [], (error, result, fields) => {
                if (error) {
                    console.log("error var");
                    return;
                    }
                res.send({
                    code: result.length > 0 ? 200 : 400,
                    data: result
                } as ResponseDatas)
            })
                break;
        
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}

export const MalzemeDepoSonrakiKayitGetir: Handler = (req, res) => {
    const { id, tip } = req.params;
    mysql.connect();
    try {
        switch (tip) {
            /* malzeme deponun girişi önceki kayıtların listelenmesi */
            case "giris":
                mysql.query(`SELECT d1.ID,D1.TARIH,D1.FIRMA_KODU,D1.FIRMA_ADI,D1.FATURA_NO,d1.ACIKLAMA,d2.KALEM_ISLEM,d2.MALZEME_KODU,d2.MALZEME_ADI,d2.MIKTAR,d2.BIRIM
                FROM malzeme_depo1 d1 INNER JOIN malzeme_depo2 d2 on d1.ID = d2.REF_NO
                where d1.ISLEM_CINSI = 'MALZEME_GIRIS' AND d1.ID = (SELECT MIN(ID) from malzeme_depo1 WHERE ID > ${id})
                ORDER BY D1.ID desc;
            `, [], (error, result, fields) => {
                if (error) {
                    console.log("error var");
                    return;
                    }
                res.send({
                    code: result.length > 0 ? 200 : 400,
                    data: result
                } as ResponseDatas)
            })
                break;
        
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}

export const MalzemeDepoKaydet: Handler = (req, res) => {
    const { id, tip } = req.params;
    const { kalem } = req.body;
    try {
        const { ISLEM_CINSI, TARIH, TEDARIKCI_KODU, TEDARIKCI_ADI, FATURA_NO} /* : MalzemeDepo */ = req.body.values;
                    const sorgu = `INSERT INTO malzeme_depo1
                    (ISLEM_CINSI,TARIH, FIRMA_KODU, FIRMA_ADI,FATURA_NO)
                    VALUES (
                        '${ISLEM_CINSI}',
                        '${TARIH}',
                        '${TEDARIKCI_KODU}',
                        '${TEDARIKCI_ADI}',
                        '${FATURA_NO}'
                    )`;                
                    mysql.query(sorgu, [], (error, result, fields) => {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        console.log("kayit basarili");
                        res.send({
                            code: 200,
                            message :"Birim kayıt işlemi başarılı."
                        } as ResponseDataSuccessfully)
                    })
        return;
        switch (tip) {
            case "giris":
                if (id === undefined) { //id undefined ise yeni kayıt demektir.
                    const { ISLEM_CINSI, TARIH, TEDARIKCI_KODU, TEDARIKCI_ADI, FATURA_NO} /* : MalzemeDepo */ = req.body.values;
                    const sorgu = `INSERT INTO malzeme_depo1
                    (ISLEM_CINSI,TARIH, FIRMA_KODU, FIRMA_ADI,FATURA_NO)
                    VALUES (
                        '${ISLEM_CINSI}',
                        '${TARIH}',
                        '${TEDARIKCI_KODU}',
                        '${TEDARIKCI_ADI}',
                        '${FATURA_NO}'
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
                    
                }
                break;
        
            default:
                break;
        }
    } catch (error) {
        console.log("error -> ",error);
        res.send("eror");
    }
    mysql.close();
}