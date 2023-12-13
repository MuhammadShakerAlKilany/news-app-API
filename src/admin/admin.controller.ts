import { Controller, Post ,Get ,Request, UseGuards ,Body, NotFoundException ,BadRequestException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {AuthGuard} from '@nestjs/passport'
import { LoginDTO } from './dto/login/login';
import * as bcrypt from "bcrypt"
import { AdminService } from './admin.service';
@Controller('admin')
export class AdminController {
 constructor(private prisma:PrismaService , private adminService:AdminService){}
    @Post()
    async getAdmin(@Body() user:LoginDTO) {
    //    await this.adminService.addAdmin(user.email,user.password);
      return await this.adminService.login(user.email,user.password)
       
    }
    @UseGuards(AuthGuard('jwt'))
    @Get()
    get(@Request() req){
        return req.user
    }
}
