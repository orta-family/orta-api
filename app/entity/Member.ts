import { Entity, Column } from 'typeorm';
import { Base } from './Base'

@Entity()
export class Member extends Base {

    @Column()
    name!: string;

    @Column({ type: 'date', nullable: true })
    birthdate!: Date;

}
