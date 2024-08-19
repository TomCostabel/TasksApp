import { Injectable } from '@nestjs/common';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class SubTasksService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createSubTask(createSubTaskDto: CreateSubTaskDto) {
    const user = await this.userModel.findOne({ id: createSubTaskDto.userId })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }
    const findTask = user.tasks.find(task => task.id === createSubTaskDto.taskId)
    const newSubTask = { title: createSubTaskDto.title, subTaskCheck: false, id: uuidv4() }

    if (!findTask.subTasks) {
      findTask.subTasks = []
    }

    findTask.subTasks.push(newSubTask)

    await user.save()

    return newSubTask
  }

  findAll() {
    return `This action returns all subTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subTask`;
  }

  update(id: number, updateSubTaskDto: UpdateSubTaskDto) {
    return `This action updates a #${id} subTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} subTask`;
  }
}
