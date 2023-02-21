import express from 'express';
const router = express.Router();
import { UlkeGetir } from '../controllers/UlkeControllers';

router.get("/", UlkeGetir);

export default router;