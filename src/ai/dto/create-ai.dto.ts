import { IsNotEmpty } from "class-validator";

export class CreateAiDto {
    @IsNotEmpty({ message: "Você deve informar a mensagem" })
    message: string;
}
