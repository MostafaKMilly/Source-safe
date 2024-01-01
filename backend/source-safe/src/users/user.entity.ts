import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { File } from 'src/files/file.entity';
import { Group } from 'src/group/group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => File, (file) => file.lockedBy)
  lockedFiles: File[];

  @OneToMany(() => File, (file) => file.uploadedBy)
  uploadedFiles: File[];

  @ManyToMany(() => Group, (group) => group.user)
  group: Array<Group>;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
