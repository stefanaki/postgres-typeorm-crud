import { createConnection } from 'typeorm';
import { Client } from './entities/Client';
import { Banker } from './entities/Banker';
import { Transaction } from './entities/Transaction';
import express from 'express';
import clientRouter from './routes/client';
import transactionRouter from './routes/transaction';
import bankerRouter from './routes/banker';

const app = express();

const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'db',
			port: 5432,
			username: 'postgres',
			password: 'postgres123',
			database: 'typeorm',
			entities: [Client, Banker, Transaction],
			synchronize: true
		});

		console.log('Connected to Postgres Server');

		app.use(express.json());

		app.use('/api/client', clientRouter);
		app.use('/api/transaction', transactionRouter);
		app.use('/api/banker', bankerRouter);

		app.listen(process.env.PORT || 8080, () =>
			console.log(`API started running on port ${process.env.PORT || 8080}`)
		);
	} catch (err) {
		console.log(err);
		throw new Error('Could not connect to Postgres Server');
	}
};

main();
