import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export default class ActiveSession {
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: false })
  token!: string;

  @Column({ type: 'text', nullable: false })
  userId!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date?: string;
}
