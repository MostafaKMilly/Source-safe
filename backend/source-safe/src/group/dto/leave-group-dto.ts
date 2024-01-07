import { IsNumber } from 'class-validator';

export class LeavveGroupDto {
  @IsNumber()
  groupId: number;

  @IsNumber()
  userId: number;
}
