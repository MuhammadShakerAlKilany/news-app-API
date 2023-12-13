import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwtStrategy';
import { LoginDTO } from './dto/login/login';

@Module({
  providers: [AdminService,JwtStrategy,LoginDTO],
  controllers: [AdminController],
  imports:[PrismaModule,JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'5d'}
  })],
  exports:[JwtStrategy]
})
export class AdminModule {}
