import { BaseEntity, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

abstract class Base extends BaseEntity {
  type?: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @BeforeUpdate()
  public setUpdateDate(): void {
    this.updatedAt = new Date();
  }

  public serialize(): {} {
    const { id, type, createdAt, updatedAt } = this;
    const meta = { createdAt, updatedAt };

    const attributes = { ...this };
    delete attributes.id;
    delete attributes.type;
    delete attributes.createdAt;
    delete attributes.updatedAt;

    const response = { id, type, attributes, meta };

    return response;
  }
}

export { Base };
