import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDTO {
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/,{
        message:"password at least eight characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character"
    })
    password:string
}
