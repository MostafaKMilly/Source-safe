import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { File } from 'src/files/file.entity';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => File, (file) => file.history)
  @JoinColumn({ name: 'file' })
  file: File;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;
}
