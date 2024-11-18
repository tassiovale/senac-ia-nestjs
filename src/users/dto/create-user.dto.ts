import { IsNotEmpty } from "class-validator";
import { LoginDto } from "./login.dto";

export class CreateUserDto extends LoginDto {
    @IsNotEmpty({ message: 'O nome deve ser informado' })
    name: string;
}
