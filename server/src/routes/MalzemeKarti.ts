import express from 'express';
import { MalzemeKartiGetir, MalzemeKartiKaydet } from '../controllers/MalzemeKartiControllers';
const router = express.Router();

router.get("/", MalzemeKartiGetir);
router.post("/", MalzemeKartiKaydet);

export default router;