import express from 'express';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';

export default class ClientController {
	public static createClient = async (req: express.Request, res: express.Response) => {
		const { firstName, lastName, email, cardNumber, balance } = req.body;

		const client = Client.create({
			firstName,
			lastName,
			email,
			cardNumber,
			balance
		});

		await client.save();
		res.json(client);
	};

	public static fetchClient = async (req: express.Request, res: express.Response) => {
		const { clientID } = req.params;
		const client = await Client.findOne(parseInt(clientID));

		if (!client) {
			return res.json({ message: 'Client does not exist' });
		}

		return res.json(client);
	};

	public static deleteClient = async (req: express.Request, res: express.Response) => {
		const { clientID } = req.body;
		const client = await Client.findOne(parseInt(clientID));

		if (!client) {
			return res.json({ message: 'Client does not exist' });
		}

		await Client.delete(parseInt(clientID));
		return res.json({ message: 'Client deleted successfuly' });
	};

	public static connectWithBanker = async (req: express.Request, res: express.Response) => {
		const { clientID, bankerID } = req.params;

		const client = await Client.findOne(parseInt(clientID));
		const banker = await Banker.findOne(parseInt(bankerID));

		if (!(client && banker)) {
			return res.json({
				message: 'Banker or client not found'
			});
		}

		banker.clients = [client];

		await banker.save();
		return res.json({
			message: 'Connected banker to client',
			banker,
			client
		});
	};
}
