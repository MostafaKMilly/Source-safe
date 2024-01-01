import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ default: 'free' })
  status: 'free' | 'checked-out';

  @ManyToOne(() => User, (user) => user.lockedFiles, { nullable: true })
  @JoinColumn({ name: 'lockedBy' })
  lockedBy: User;

  @ManyToOne(() => User, (user) => user.uploadedFiles, { nullable: true })
  @JoinColumn({ name: 'uploadedBy' })
  uploadedBy: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;
}
