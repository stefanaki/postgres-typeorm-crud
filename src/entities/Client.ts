import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('clients')
export class Client extends BaseEntity {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ unique: true })
	email: string;

	@Column({ unique: true })
	cardNumber: string;

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
}
