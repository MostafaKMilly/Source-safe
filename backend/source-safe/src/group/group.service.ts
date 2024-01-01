import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { AddUserDto } from './dto/add-user.dto';
import { User } from 'src/users/user.entity';
import { RemoveUserDto } from './dto/remove-user.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    return await this.groupRepository.save(group);
  }

  async findAll(): Promise<Array<Group>> {
    return await this.groupRepository.find();
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      relations: ['user'],
      where: {
        id,
      },
    });
    if (!group)
      throw new HttpException(
        `group with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return group;
  }

  async update(id: number, updateData: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.preload({
      id,
      ...updateData,
    });
    if (!group)
      throw new HttpException(
        `group with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return await this.groupRepository.save(group);
  }

  async delete(id: number) {
    const group = await this.findOne(id);
    if (!group)
      throw new HttpException(
        `group with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return await this.groupRepository.remove(group);
  }

  async addUser(addDate: AddUserDto): Promise<boolean> {
    const users =
      addDate.users &&
      (await Promise.all(addDate.users.map((item) => this.preLoadUser(item))));

    const group = await this.findOne(addDate.groupId);
    if (!group)
      throw new HttpException(`group not found`, HttpStatus.NOT_FOUND);

    const setUser = new Set(users.concat(group.user));

    const data = await this.groupRepository.preload({
      id: addDate.groupId,
      ...group,
      user: [...setUser],
    });
    await this.groupRepository.save(data);
    return true;
  }

  async removeUser(removeDate: RemoveUserDto): Promise<boolean> {
    const group = await this.findOne(removeDate.groupId);
    if (!group)
      throw new HttpException(`group not found`, HttpStatus.NOT_FOUND);
    const data = await this.groupRepository.preload({
      id: removeDate.groupId,
      ...group,
      user: group.user.filter((item) => item.id !== removeDate.userId),
    });
    await this.groupRepository.save(data);
    return true;
  }

  private async preLoadUser(id: number) {
    const existingUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!existingUser) {
      throw new HttpException(
        `User with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      id: existingUser.id,
      username: existingUser.username,
    };
  }
}
