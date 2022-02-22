import { createConnection } from 'typeorm';
import { Client } from './entities/Client';
import { Banker } from './entities/Banker';
import { Transaction } from './entities/Transaction';
import express from 'express';
import { createClientRouter } from './routes/CreateClient';
import { createBankerRouter } from './routes/CreateBanker';

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

		app.use('/api', createClientRouter);
		app.use('/api', createBankerRouter);

		app.listen(process.env.PORT || 8080, () =>
			console.log(`API started running on port ${process.env.PORT || 8080}`)
		);
	} catch (err) {
		console.log(err);
		throw new Error('Could not connect to Postgres Server');
	}
};

main();
