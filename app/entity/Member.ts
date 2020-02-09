import { Entity, Column } from 'typeorm';
import { Slug } from './Slug'

@Entity()
export class Member extends Slug {

    @Column({ type: 'date', nullable: true })
    birthdate!: Date;

}
