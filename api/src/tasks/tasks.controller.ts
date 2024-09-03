import { Controller, Post, Body, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post('add')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('update')
  update(@Body() body: { taskId: string, userId: string }) {
    const { taskId, userId } = body;
    return this.tasksService.update(taskId, userId);
  }

  @Delete('delete')
  remove(@Body() body: { taskId: string, userId: string }) {
    const { taskId, userId } = body;
    return this.tasksService.remove(taskId, userId);
  }
}
