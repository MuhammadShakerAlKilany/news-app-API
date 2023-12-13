import { Controller, Get, Param, ParseUUIDPipe,UseGuards ,Post, Body, Delete, HttpCode, NotFoundException} from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';
import { MassageContent } from './dto/massage-content/massage-content';
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get(':postId')
  async allPostMessage(@Param('postId',new ParseUUIDPipe()) postId:string){
    return await this.messageService.getAllPostMessage(postId);
  }
  @HttpCode(201)
  @Post(':postId')
  async addMessage(@Param('postId',new ParseUUIDPipe()) postId:string,@Body() body:MassageContent){
    return await this.messageService.addMessage(postId,body.content)
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  async deleteMessage(@Param('id',new ParseUUIDPipe()) id:string){
    const message = await this.messageService.deleteMessage(id)
    if(!message)throw new NotFoundException(`Not find message id:${id}`)
    return message
  }
}
