import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
    constructor(private prisma:PrismaService){}
    async addMessage(postId:string,content:string){
        try {
            
            return await this.prisma.message.create({data:{content,postId}});
        } catch (error) {
            if(error.code=="P2003")throw new BadRequestException("not found postId")
            
        }
    }
    async deleteMessage(id:string){
        return await this.prisma.message.delete({where:{id}})
    }
    async getAllPostMessage(postId:string){
        return await this.prisma.message.findMany({where:{postId}})
    }
}
