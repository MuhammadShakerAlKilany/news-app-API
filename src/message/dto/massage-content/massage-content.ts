import { IsString } from "class-validator";

export class MassageContent {
    @IsString()
    content:string
}
