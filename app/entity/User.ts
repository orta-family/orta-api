import { BeforeInsert, BeforeUpdate, Entity, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { Uuid } from './Uuid'

@Entity()
class User extends Uuid {
    type: string = 'user';

    @Column({ unique: true })
    @IsEmail()
    email!: string;

    @Column()
    password!: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
      this.password = await bcrypt.hash(this.password, 10);
    }

}

export { User };