import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import slugify from 'slugify';
import { Base } from './Base';

export abstract class Slug extends Base {
    @Column()
    name!: string;

    @Column({ unique: true })
    slug!: string;

    @BeforeInsert()
    public setSlugBeforeInsert(): void {
      this.slug = slugify(this.name);
    }

    @BeforeUpdate()
    public setSlugBeforeUpdate(): void {
      this.slug = slugify(this.name);
    }
}
