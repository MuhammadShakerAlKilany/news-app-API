import { Controller, Post ,Body,Param, ParseEnumPipe, Get, UseGuards,Delete, ParseUUIDPipe, NotFoundException} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
    constructor(private postService:PostService){}
    @UseGuards(AuthGuard('jwt'))
    @Post(':type')
    addPost(@Body() post:any,@Param('type',new ParseEnumPipe(['وفيات',"دكتور","مناسبات"])) type:string){
       return this.postService.addPost({content:post,type})
    }
    
    @Get(':type')
    getPosts(@Param('type',new ParseEnumPipe(['وفيات',"دكتور","مناسبات"])) type:string){
       return this.postService.getAllPost(type);
    }
    
    @UseGuards(AuthGuard("jwt"))
    @Delete(":id")
    async deletePost(@Param('id',new ParseUUIDPipe()) id:string){
      const post = await this.postService.deletePost(id)
      if(!post)throw new NotFoundException(`Not find post with id:${id}`)
      return post
    }
}
