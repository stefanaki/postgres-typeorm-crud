import express from 'express';
import { Client } from '../entities/Client';
import { Transaction, TransactionTypes } from '../entities/Transaction';

export default class TransactionController {
	public static createTransaction = async (req: express.Request, res: express.Response) => {
		const { clientID, type, amount } = req.body;

		const client = await Client.findOne(parseInt(clientID));

		if (!client) {
			return res.json({
				message: 'Client not found'
			});
		}

		const transaction = Transaction.create({
			amount,
			type,
			client
		});

		if (type === TransactionTypes.DEPOSIT) {
			client.balance = client.balance + parseFloat(amount);
			client.transactions = [transaction];
		} else if (type === TransactionTypes.WITHDRAW) {
			client.balance = client.balance - parseFloat(amount);
			client.transactions = [transaction];
		}

		await client.save();
		await transaction.save();

		await client.reload();

		return res.json({
			message: 'Transaction inserted successfuly',
			transaction
		});
	};
}
