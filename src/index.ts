import { createConnection } from 'typeorm';
import { Client } from './entities/Client';

const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'root',
			password: 'rootroot123',
			database: 'typeorm',
			entities: [Client],
			synchronize: true
		});

		console.log('Connected to Postgres Server');
	} catch (err) {
		console.log(err);
		throw new Error('Could not connect to Postgres Server');
	}
};
