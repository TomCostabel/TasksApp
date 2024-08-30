import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }

  findAll() {
    return this.userModel.find()
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    const { email } = newUser
    try {
      const userExistente = await this.userModel.findOne({ email: email })
      if (userExistente) {
        throw new Error('Email ya registrado')
      }
      const hashedPassword = await this.hashPassword(newUser.password);
      const createdUser = new this.userModel({
        ...newUser,
        email: email.toLowerCase(),
        isActive: true,
        id: uuidv4(),
        password: hashedPassword,
        isLogin: false
      });
      return await createdUser.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  deleteUser(id: string) {
    return this.userModel.findOneAndDelete({ _id: id })
  }

  findOne(email: string) {
    const user = this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException(`Usuario con el id #${email} no encontrado`)
    }

    return user
  }

}