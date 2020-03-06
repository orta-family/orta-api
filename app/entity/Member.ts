import { Entity, Column } from 'typeorm';
import { Slug } from './Slug'

@Entity()
class Member extends Slug {
    type: string = 'member';

    @Column({ type: 'date', nullable: true })
    birthdate!: Date;

}

export { Member };