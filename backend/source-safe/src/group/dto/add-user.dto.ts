import { IsNumber, ArrayMinSize } from 'class-validator';

export class AddUserDto {
  @ArrayMinSize(1)
  users: Array<number>;

  @IsNumber()
  groupId: number;
}
