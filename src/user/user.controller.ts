import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../auth/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('N')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }
}
