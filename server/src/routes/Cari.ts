import express from 'express';
const router = express.Router();
import { CariGetir } from '../controllers/CariControllers';

router.get("/", CariGetir);

export default router;