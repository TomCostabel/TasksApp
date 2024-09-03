import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { User, userSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksModule]

})
export class TasksModule { }
