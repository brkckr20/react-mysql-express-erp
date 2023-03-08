import express from "express";
import cors from 'cors';
const app = express();

import MalzemeKartiRouter from './routes/MalzemeKarti';
import MalzemeDepoRouter from './routes/MalzemeDepo';
import KalemIslemRouter from './routes/KalemIslem';
import BirimRouter from './routes/Birim';
import CariRouter from './routes/Cari';
import UlkeRouter from './routes/Ulke';
import MainRouter from './routes/Main';

app.use(cors());
app.use(express.json());

app.use("/malzemedepo", MalzemeDepoRouter);
app.use("/malzemekarti", MalzemeKartiRouter);
app.use("/kalem-islem", KalemIslemRouter);
app.use("/birim", BirimRouter);
app.use("/cari", CariRouter);
app.use("/ulke", UlkeRouter);
app.use("/", MainRouter);

app.listen(3002, () => console.log("Server listening on http://localhost:3002"));