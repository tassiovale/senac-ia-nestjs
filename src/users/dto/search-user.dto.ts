import { IsEmail, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/shared/dto/pagination.dto";

export class SearchUserDto extends PaginationDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;
}