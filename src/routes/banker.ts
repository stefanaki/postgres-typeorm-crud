import express from 'express';
import BankerController from '../controllers/BankerController';

const router = express.Router();

router.get('/:bankerID', BankerController.fetchBanker);
router.post('/', BankerController.createBanker);
router.delete('/', BankerController.deleteBanker);

export default router;
