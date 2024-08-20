import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubTasksService } from './sub-tasks.service';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';

@Controller('sub-tasks')
export class SubTasksController {
  constructor(private readonly subTasksService: SubTasksService) { }

  @Post('add')
  create(@Body() createSubTaskDto: CreateSubTaskDto) {
    return this.subTasksService.createSubTask(createSubTaskDto);
  }

  @Patch('update')
  update(@Body() body: { userId: string, taskId: string, subTaskId: string }) {
    const { userId, taskId, subTaskId } = body
    return this.subTasksService.update(userId, taskId, subTaskId);
  }

  @Delete('remove')
  remove(@Body() body: { userId: string, taskId: string, subTaskId: string }) {
    const { userId, taskId, subTaskId } = body
    return this.subTasksService.remove(userId, taskId, subTaskId);
  }
}
