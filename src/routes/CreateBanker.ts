import express from 'express';
import { Banker } from '../entities/Banker';

const router = express.Router();

router.post('/banker', async (req, res) => {
	const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

	const banker = Banker.create({
		firstName,
		lastName,
		email,
		cardNumber,
		employeeNumber
	});

	await banker.save();
	res.json(banker);
});

export { router as createBankerRouter };
