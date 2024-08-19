import { Module } from '@nestjs/common';
import { SubTasksService } from './sub-tasks.service';
import { SubTasksController } from './sub-tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
  ],
  controllers: [SubTasksController],
  providers: [SubTasksService],
  exports: [SubTasksModule],
})
export class SubTasksModule { }
