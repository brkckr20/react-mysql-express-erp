import express from 'express';
import { MalzemeDepoGetir } from '../controllers/MalzemeDepoControllers';
const router = express.Router();

router.get("/giris/:depoAdi", MalzemeDepoGetir);
router.get("/giris/oncekikayit/:depoAdi", MalzemeDepoGetir);

export default router;