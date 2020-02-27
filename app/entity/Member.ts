import { Entity, Column } from 'typeorm';
import { Slug, attributes as slugAttributes } from './Slug'

const attributes = [...slugAttributes, 'birthdate'];
@Entity()
class Member extends Slug {

    @Column({ type: 'date', nullable: true })
    birthdate!: Date;

}

export { Member, attributes };