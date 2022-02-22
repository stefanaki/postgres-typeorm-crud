import express from 'express';
import { Banker } from '../entities/Banker';

export default class ClientController {
	public static createBanker = async (req: express.Request, res: express.Response) => {
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
	};

	public static fetchBanker = async (req: express.Request, res: express.Response) => {
		const { bankerID } = req.params;
		const banker = await Banker.findOne(parseInt(bankerID));

		if (!banker) {
			return res.json({ message: 'Banker does not exist' });
		}

		return res.json(banker);
	};

	public static deleteBanker = async (req: express.Request, res: express.Response) => {
		const { bankerID } = req.body;
		const banker = await Banker.findOne(parseInt(bankerID));

		if (!banker) {
			return res.json({ message: 'Banker does not exist' });
		}

		await Banker.delete(parseInt(bankerID));
		return res.json({ message: 'Banker deleted successfuly' });
	};
}
