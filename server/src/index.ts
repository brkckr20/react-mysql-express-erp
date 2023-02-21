import express, { Request, Response } from "express";
import cors from 'cors';
const app = express();

import MalzemeKartiRouter from './routes/MalzemeKarti';
import BirimRouter from './routes/Birim';
import CariRouter from './routes/Cari';
import UlkeRouter from './routes/Ulke';

app.use(cors());
app.use(express.json());

app.use("/malzemekarti", MalzemeKartiRouter);
app.use("/birim", BirimRouter);
app.use("/cari", CariRouter);
app.use("/ulke", UlkeRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(3002, () => console.log("Server listening on http://localhost:3002"));