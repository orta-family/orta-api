import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { Length } from "class-validator";
import slugify from 'slugify';
import { Base } from './Base';

export abstract class Slug extends Base {
    @Column()
    @Length(1)
    name!: string;

    @Column({ unique: true })
    slug!: string;

    @BeforeInsert()
    @BeforeUpdate()
    public setSlugFromName(): void {
      this.slug = slugify(this.name);
    }

    static findBySlug(slug: string) {
      return this.createQueryBuilder('s')
        .where('s.slug = :slug', { slug })
        .getOne();
    }
}
