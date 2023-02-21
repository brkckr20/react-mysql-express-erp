import express from 'express';
const router = express.Router();
import { BirimGetir } from '../controllers/BirimControllers';

router.get("/", BirimGetir);

export default router;