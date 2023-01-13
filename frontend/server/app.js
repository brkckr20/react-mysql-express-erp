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
    try {
        switch (tip) {
            case "kaydet":
                console.log("kaydet bölümüne girdi");
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

