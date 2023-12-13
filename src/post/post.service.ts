import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(private prisma:PrismaService){}
    
    async addPost(post:Prisma.PostCreateInput){
       return await this.prisma.post.create({data:post});

    }
    async getAllPost(type:string){
        return await this.prisma.post.findMany({where:{type}});
    }
    async deletePost(id:string){
        await this.prisma.message.deleteMany({where:{postId:id}})
        return await this.prisma.post.delete({where:{id}})
    }
}
