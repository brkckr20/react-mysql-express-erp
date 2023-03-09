import express from 'express';
import { MalzemeDepoGetir, MalzemeDepoKaydet, MalzemeDepoOncekiKayitGetir, MalzemeDepoSonrakiKayitGetir } from '../controllers/MalzemeDepoControllers';
const router = express.Router();

router.get("/giris/:depoAdi", MalzemeDepoGetir);
router.get("/:tip/onceki/:id", MalzemeDepoOncekiKayitGetir);
router.get("/:tip/sonraki/:id", MalzemeDepoSonrakiKayitGetir);
router.post("/:tip", MalzemeDepoKaydet);

export default router;