import { IsArray, MinLength } from 'class-validator';

export class AddFileDto {
  // @IsArray({
  //   message: 'please , add the group you want to add the file in to it',
  // })
  @MinLength(1, {
    message: 'please , add the groups you want to add the file in to it',
  })
  groupId: Array<string>;
}
