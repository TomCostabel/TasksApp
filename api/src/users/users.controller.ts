import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('email')
  findOne(@Body('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

} 
