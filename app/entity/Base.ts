import { BaseEntity, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Base extends BaseEntity {

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
}
