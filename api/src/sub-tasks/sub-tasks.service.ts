import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
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

    return user.tasks
  }


  async update(userId: string, taskId: string, subTaskId: string) {
    const user = await this.userModel.findOne({ id: userId })

    if (!user) {
      throw new NotFoundException(`Usuario con el id #${userId} no encontrado`)
    }
    const task = user.tasks.find(task => task.id === taskId)
    if (!user.tasks.find((elm: any) => elm.id === taskId)) {
      return `No se encontro tarea con este id ${taskId}`
    }

    const subTask = task.subTasks.find((task: any) => task.id === subTaskId)
    subTask.subTaskCheck = !subTask.subTaskCheck

    user.save()

    return user.tasks
  }

  async remove(userId: string, taskId: string, subTaskId: string) {
    const user = await this.userModel.findOne({ id: userId })
    if (!user) {
      throw new NotFoundException(`Usuario con el id #${userId} no encontrado`)
    }
    const task = user.tasks.find(task => task.id === taskId)
    if (!user.tasks.find((elm: any) => elm.id === taskId)) {
      return `No se encontro tarea con este id ${taskId}`
    }

    task.subTasks = task.subTasks.filter((task: any) => task.id !== subTaskId)

    await user.save()

    return user.tasks
  }
}
