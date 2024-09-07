import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Import du schéma User
  ],
  providers: [UserService],
  controllers:[UserController],
  exports: [UserService], // Exportez UserService pour l'utiliser dans AuthModule
})
export class UserModule {}
