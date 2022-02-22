import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Client } from './Client';
import { Person } from './utils/Person';

@Entity('bankers')
export class Banker extends Person {
	@Column({ unique: true, length: 10 })
	employeeNumber: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToMany(() => Client)
	@JoinTable({
		name: 'bankersClients',
		joinColumn: {
			name: 'bankers',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'clients',
			referencedColumnName: 'id'
		}
	})
	clients: Client[];
}
