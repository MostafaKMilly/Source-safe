import { Group } from 'src/group/group.entity';
import { History } from 'src/history/history.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
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

  @OneToMany(() => History, (history) => history.file, {
    nullable: true,
  })
  history: Array<History>;

  @JoinTable()
  @ManyToMany(() => Group, (group) => group.file, {
    cascade: true,
    nullable: true,
  })
  group: Array<Group>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;
}
