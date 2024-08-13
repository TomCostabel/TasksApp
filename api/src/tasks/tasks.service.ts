import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class TasksService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createask(createTaskDto: CreateTaskDto) {

    const user = await this.userModel.findById(createTaskDto.userId)
    user.tasks.push({ title: createTaskDto.title, check: false, id: uuidv4() })
    user.save()
    return user
  }

  async findAll(id: string) {
    const user = await this.userModel.findById(id)
    return user.tasks;
  }

  async update(taskId: string, userId: string) {
    const user = await this.userModel.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException(`Usuario con el id #${userId} no encontrado`);
    }

    const task = user.tasks.find((elm: any) => elm.id === taskId);

    if (!task || Array.isArray(task)) {
      return `No se encontró tarea con este id ${taskId}`;
    }

    task.check = !task.check;

    const savedUser = await user.save();

    return task.check;
  }

  async remove(taskId: string, userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con el id #${userId} no encontrado`)
    }
    if (!user.tasks.find((elm: any) => elm.id === taskId)) {
      return `No se encontro tarea con este id ${taskId}`
    }

    user.tasks = user.tasks.filter((task: any) => task.id !== taskId);

    await user.save();

    return 'Tarea eliminada con exito'
  }
}
