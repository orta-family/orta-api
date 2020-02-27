import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { Length } from "class-validator";
import slugify from 'slugify';
import { Base, attributes as baseAttributes } from './Base';

const attributes = [...baseAttributes, 'name', 'slug']
const slugifyOptions = { lower: true };
const makeSlug = (str: string) : string => slugify(str, slugifyOptions);
abstract class Slug extends Base {
    @Column()
    @Length(1)
    name!: string;

    @Column({ unique: true })
    slug!: string;

    @BeforeInsert()
    @BeforeUpdate()
    public setSlugFromName(): void {
      if (this.slug) {
        this.slug = makeSlug(this.slug);
      }
      if (!this.slug) {
        this.slug = makeSlug(this.name);
      }
    }

    static findBySlug(slug: string, alias: string = 'slugable') {
      return this.createQueryBuilder(alias)
        .where(`${alias}.slug = :slug`, { slug })
        .getOne();
    }
}

export { Slug, attributes, makeSlug, slugifyOptions };