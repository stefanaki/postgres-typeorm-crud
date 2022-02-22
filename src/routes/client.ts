import express from 'express';
import ClientController from '../controllers/ClientController';

const router = express.Router();

router.get('/:clientID', ClientController.fetchClient);
router.post('/', ClientController.createClient);
router.delete('/', ClientController.deleteClient);

router.post('/:clientID/banker/:bankerID', ClientController.connectWithBanker);

export default router;
