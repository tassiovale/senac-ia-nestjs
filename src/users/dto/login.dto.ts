import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;

    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1
        },
        { message: 'Sua senha deve ter pelo menos 8 caracteres contendo letras maiúsculas e minúsculas, números e símbolos'}
    )
    password: string;
}