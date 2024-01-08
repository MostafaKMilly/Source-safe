import { IsOptional, IsString } from "class-validator";

export class AddFileDto {
    @IsString()
    groupId: number

    @IsString()
    @IsOptional()
    fileId?: number
}
