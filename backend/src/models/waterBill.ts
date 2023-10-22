import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export default class WaterBill {
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({type : 'integer'})
  liter!: number;

  @Column({ type: 'decimal' })
  value!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column({type: 'varchar'})
  user_id!: string;
}