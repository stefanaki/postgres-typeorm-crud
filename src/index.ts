import { createConnection } from 'typeorm';
import { Client } from './entities/Client';

const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres123',
			entities: [Client],
			synchronize: true
		});

		console.log('Connected to Postgres Server');
	} catch (err) {
		console.log(err);
		throw new Error('Could not connect to Postgres Server');
	}
};

main();