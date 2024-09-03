import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { SubTasksModule } from './sub-tasks/sub-tasks.module';
import * as dotenv from 'dotenv';

dotenv.config();
const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;
@Module({
  imports: [UsersModule, MongooseModule.forRoot(`mongodb+srv://${USERNAME}:${PASSWORD}@usuarios.rzpld.mongodb.net/?retryWrites=true&w=majority&appName=Usuarios`), AuthModule, TasksModule, SubTasksModule],
  controllers: [AppController],
  providers: [AppService]
  // imports: [MongooseModule.forRoot('mongodb://localhost/nest')]
})
export class AppModule { }
