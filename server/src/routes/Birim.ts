import express from 'express';
const router = express.Router();
import { BirimGetir, BirimKaydet } from '../controllers/BirimControllers';

router.get("/", BirimGetir);
router.post("/", BirimKaydet);

export default router;