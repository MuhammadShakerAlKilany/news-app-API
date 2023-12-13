import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AdminService {
    constructor(private jwt:JwtService ,private prisma: PrismaService) { }
    async addAdmin(email: string, password: string) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
            await this.prisma.admin.create({ data: { email: email, password: hashedPassword } })
        } catch (error) {
            if (error.code) {
                throw new BadRequestException("unique Err")
            }
        }
    }
    async login(email: string, password: string){
        const userFind = await this.prisma.admin.findFirst({where:{email:email}})
        if(userFind){
            const isCompared =  await  bcrypt.compare(password,userFind.password)
            if(isCompared){
                return {jwt:this.jwt.sign({email:userFind.email,id:userFind.id})};
            }
            }
            
            throw new NotFoundException('password or email is wrong')
    }
}
