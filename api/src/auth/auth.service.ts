import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('Email no registrado', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await this.comparePasswords(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña Incorrecta');
    }

    await this.userModel.updateOne({ email }, { isLogin: true });

    return { message: 'Login successful' };
  }

  async logout(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    await this.userModel.updateOne({ email }, { isLogin: false });
    return { message: 'Logout successful' };
  }
}
