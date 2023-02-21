import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
export default class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  order: number;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  tags: string;

  @Column()
  color: string;
}
