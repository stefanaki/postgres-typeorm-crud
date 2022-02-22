import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { Person } from './utils/Person';
import { Transaction } from './Transaction';
import { Banker } from './Banker';

@Entity('clients')
export class Client extends Person {
	@Column({ type: 'numeric' })
	balance: number;

	@Column({ default: true, name: 'active' })
	isActive: boolean;

	@Column({ type: 'simple-json', nullable: true })
	additionalInfo: {
		age: number;
		eyeColor: string;
	};

	@Column({ type: 'simple-array', default: [] })
	familyMembers: string[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => Transaction, (transaction) => transaction.client)
	transactions: Transaction[];

	@ManyToMany(() => Banker)
	bankers: Banker[];
}
