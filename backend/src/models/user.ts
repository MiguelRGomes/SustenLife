import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export default class User {
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: false })
  username!: string;

  @Column({ type: 'text', nullable: false })
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  cnpj?: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @Column({ type: 'varchar', nullable: false })
  user_type?: string;

  @Column({ type: 'varchar', nullable: true })
  adress?: string;
  
  @Column({type : 'integer', nullable: true })
  adress_number!: number;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date?: string;

  @Column({type: 'text'})
  user_role!: string
}
