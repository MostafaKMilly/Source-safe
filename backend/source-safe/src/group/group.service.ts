import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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

  async create(
    createGroupDto: CreateGroupDto,
    ownerId: number,
  ): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    const owner = await this.userRepository.findOne({
      where: {
        id: ownerId,
      },
    });
    if (!owner)
      throw new HttpException(`Owner not found`, HttpStatus.NOT_FOUND);

    group.owner = owner;
    group.users = [owner];
    return await this.groupRepository.save(group);
  }

  async findAll(
    userId: number,
    query?: {
      name?: string;
      showOwnerGroups?: boolean;
    },
  ): Promise<Array<Group>> {
    const whereConditions = [];

    whereConditions.push({ users: { id: userId } });

    if (query?.name) {
      whereConditions.push({ name: ILike(`%${query.name}%`) });
    }

    if (query?.showOwnerGroups) {
      whereConditions.push({ owner: { id: userId } });
    }

    return await this.groupRepository.find({
      where: whereConditions.length > 0 ? whereConditions : {},
      relations: ['owner', 'users'],
    });
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

  async update(
    id: number,
    updateData: UpdateGroupDto,
    userId: number,
  ): Promise<Group> {
    const group = await this.groupRepository.findOne({
      relations: ['owner'],
      where: { id },
    });
    if (!group)
      throw new HttpException(`Group not found`, HttpStatus.NOT_FOUND);

    if (group.owner.id !== userId) {
      throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    }

    return await this.groupRepository.save({ ...group, ...updateData });
  }

  async delete(id: number, userId: number) {
    const group = await this.groupRepository.findOne({
      relations: ['owner'],
      where: { id },
    });
    if (!group)
      throw new HttpException(`Group not found`, HttpStatus.NOT_FOUND);

    if (group.owner.id !== userId) {
      throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    }
    if (!group)
      throw new HttpException(
        `group with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return await this.groupRepository.remove(group);
  }

  async addUser(addUserData: AddUserDto, userId: number): Promise<boolean> {
    const users =
      addUserData.users &&
      (await Promise.all(
        addUserData.users.map((item) => this.preLoadUser(item)),
      ));
    const group = await this.groupRepository.findOne({
      relations: ['owner'],
      where: { id: addUserData.groupId },
    });
    if (!group)
      throw new HttpException(`Group not found`, HttpStatus.NOT_FOUND);

    if (group.owner.id !== userId) {
      throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    }
    const setUser = new Set(users.concat(group.users));

    const data = await this.groupRepository.preload({
      id: addUserData.groupId,
      ...group,
      users: [...setUser],
    });
    await this.groupRepository.save(data);
    return true;
  }

  async removeUser(
    removeUserData: RemoveUserDto,
    userId: number,
  ): Promise<boolean> {
    const group = await this.groupRepository.findOne({
      relations: ['owner'],
      where: { id: removeUserData.groupId },
    });
    if (!group)
      throw new HttpException(`Group not found`, HttpStatus.NOT_FOUND);

    if (group.owner.id !== userId) {
      throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    }

    const data = await this.groupRepository.preload({
      id: removeUserData.groupId,
      ...group,
      users: group.users.filter((item) => item.id !== removeUserData.userId),
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
