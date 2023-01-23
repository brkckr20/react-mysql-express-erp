import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const baglanti = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "portal"
})

app.get("/malzemekarti", async (req, res) => {
    baglanti.query("SELECT * FROM malzeme_karti", (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.post("/malzemekarti", async (req, res) => {
    const { MALZEME_KODU, MALZEME_ADI, BIRIM, TEDARIKCI_KODU, TEDARIKCI_ADI, PASIF, MALZEME_GRUP, MALZEME_MARKA } = req.body;
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
    baglanti.query(sorgu, function (err) {
        if (err) throw err;
        console.log("veri girildi");
    })
    res.send();
})

app.get("/birim", async (req, res) => {
    baglanti.query("SELECT * FROM birim", (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get("/cari", async (req, res) => {
    baglanti.query("SELECT * FROM cari", (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.post("/cari", async (req, res) => {
    const { FIRMA_KODU, FIRMA_ADI1, ADRES1, ADRES2, ULKE, ULKE_KODU, SEHIR, ILCE, POSTA_KODU, VERGI_DAIRESI, VERGI_NO, TELEFON, GIB_MAIL } = req.body;
    const sorgu = `INSERT INTO cari 
                    (FIRMA_KODU,FIRMA_UNVANI, ADRES1, ADRES2, ULKE, ULKE_KODU, SEHIR, ILCE, POSTA_KODU,VERGI_DAIRESI,VERGI_NO,TELEFON,GIB_MAIL)
                    VALUES (
                        '${FIRMA_KODU}',
                        '${FIRMA_ADI1}',
                        '${ADRES1}',
                        '${ADRES2}',
                        '${ULKE}',
                        '${ULKE_KODU}',
                        '${SEHIR}',
                        '${ILCE}',
                        '${POSTA_KODU}',
                        '${VERGI_DAIRESI}',
                        '${VERGI_NO}',
                        '${TELEFON}',
                        '${GIB_MAIL}'
                    )`
    baglanti.query(sorgu, function (err) {
        if (err) throw err;
        console.log("veri girildi");
    })
    res.send();
})

app.get("/ulke", async (req, res) => {
    baglanti.query("SELECT * FROM ulke", (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})
app.post("/ulke", async (req, res) => {
    const { ULKE_ADI, ORJ_ULKE_ADI, ALAN_KODU, KISA_KODU } = req.body;
    const sorgu = `INSERT INTO ulke 
                    (ULKE_ADI,ORJ_ULKE_ADI, ALAN_KODU, KISA_KODU)
                    VALUES (
                        '${ULKE_ADI}',
                        '${ORJ_ULKE_ADI}',
                        '${ALAN_KODU}',
                        '${KISA_KODU}'
                    )`
    baglanti.query(sorgu, function (err) {
        if (err) throw err;
        console.log("veri girildi");
    })
    res.send();
})

app.post("/malzemedepo1/:tip", async (req, res) => {
    const { tip } = req.params;
    const { ISLEM_CINSI, TARIH, TEDARIKCI_KODU, TEDARIKCI_ADI, FATURA_NO } = req.body;
    try {
        switch (tip) {
            case "kaydet":
                const sorgu = `INSERT INTO malzeme_depo1 
                    (ISLEM_CINSI,TARIH, FIRMA_KODU, FIRMA_ADI,FATURA_NO)
                    VALUES (
                        '${ISLEM_CINSI}',
                        '${TARIH}',
                        '${TEDARIKCI_KODU}',
                        '${TEDARIKCI_ADI}',
                        '${FATURA_NO}'
                    )`
                baglanti.query(sorgu, function (err) {
                    if (err) throw err;
                    // console.log("veri girildi");
                    const lastID = "SELECT LAST_INSERT_ID()"
                    baglanti.query(lastID, function (err, result) {
                        if (err) throw err;
                        console.log(result[0]['LAST_INSERT_ID()']);
                    })
                })
                res.send();
            case "fis":
                // const gelenDegerler = req.body;
                // const lastID = "SELECT LAST_INSERT_ID() from malzeme_depo1"
                // baglanti.query(lastID, function (err, result) {
                //     if (err) throw err;
                //     console.log(result[0]);
                // })
                // const x = gelenDegerler.map(i => {
                //     i.REF_NO = REF_NO
                //     return i
                // })
                // console.log(REF_NO);
                // const fisSorgu = `INSERT INTO malzeme_depo2
                //     (REF_NO,KALEM_ISLEM, MALZEME_KODU, MALZEME_ADI,MIKTAR,BIRIM,MALZEME_GRUP,MALZEME_MARKA,TESLIM_ALAN,TAKIP_NO)
                //     VALUES ?`


                // baglanti.query(fisSorgu, values, function (err) {
                //     if (err) throw err;
                //     console.log("veriler girildi");
                // })
                // const lastID = "SELECT LAST_INSERT_ID()"
                // baglanti.query(lastID, function (err, result) {
                //     if (err) throw err;
                //     console.log(result[0]['LAST_INSERT_ID()']);
                // })
                res.send();
            default:
                break;
        }
    } catch (error) {

    }
    res.send();
})

app.listen(3001, () => {
    baglanti.connect((err) => {
        if (err) throw err;
        console.log("database bağlantısı başarılı");
    })
})

