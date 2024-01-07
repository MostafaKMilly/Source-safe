import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { File } from 'src/files/file.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;

  @JoinTable()
  @ManyToMany(() => User, (user) => user.group, {
    cascade: true,
    nullable: true,
  })
  users: Array<User>;
  @ManyToOne(() => User, (user) => user.ownedGroups)
  owner: User;

  @ManyToMany(() => File, (group) => group.group)
  file: Array<File>;
}
