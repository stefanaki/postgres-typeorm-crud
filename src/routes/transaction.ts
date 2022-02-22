import express from 'express';
import TransactionController from '../controllers/TransactionController';

const router = express.Router();

router.post('/', TransactionController.createTransaction);

export default router;
