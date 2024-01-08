import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Like, Repository } from 'typeorm';
import { Group } from './group.entity';
import { AddUserDto } from './dto/add-user.dto';
import { User } from 'src/users/user.entity';
import { RemoveUserDto } from './dto/remove-user.dto';
import { SetGroupUsersDto } from './dto/set-group-users.dto';
import { LeavveGroupDto } from './dto/leave-group-dto';

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
    let whereConditions: FindOptionsWhere<Group> = {};

    if (!query?.showOwnerGroups) {
      whereConditions.users = { id: userId };
    }

    if (query?.name) {
      whereConditions.name = ILike(`%${query.name}%`);
    }

    if (query?.showOwnerGroups) {
      whereConditions.owner = { id: userId };
    }

    return await this.groupRepository.find({
      where: whereConditions,
      relations: ['owner'],
    });
  }

  async leaveGroup({ groupId, userId }: LeavveGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne({
      relations: ['users', 'owner'],
      where: { id: groupId },
    });

    if (!group) {
      throw new HttpException(`Group not found`, HttpStatus.NOT_FOUND);
    }

    if (group.owner.id === userId) {
      throw new HttpException(
        `Owner cannot leave the group`,
        HttpStatus.FORBIDDEN,
      );
    }

    const isMember = group.users.some((user) => user.id === userId);
    if (!isMember) {
      throw new HttpException(
        `User is not a member of the group`,
        HttpStatus.NOT_FOUND,
      );
    }

    group.users = group.users.filter((user) => user.id !== userId);
    return await this.groupRepository.save(group);
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      relations: ['users', 'owner'],
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

  async setGroupUsers(
    setGroupUsersDto: SetGroupUsersDto,
    ownerId: number,
  ): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: setGroupUsersDto.groupId },
      relations: ['users', 'owner'],
    });

    if (!group) {
      throw new HttpException(`Group not found`, HttpStatus.NOT_FOUND);
    }

    if (group.owner.id !== ownerId) {
      throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    }

    let userIds = setGroupUsersDto.userIds;
    if (!userIds.includes(group.owner.id)) {
      userIds.push(group.owner.id);
    }

    const users = await this.userRepository.find({
      where: {
        id: In(userIds),
      },
    });

    group.users = users;
    const res = await this.groupRepository.save(group);
    return res;
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
