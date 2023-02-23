import express from 'express';
import { DbNameGetir } from '../controllers/MainController';
const router = express.Router();

router.get("/", DbNameGetir);

export default router;