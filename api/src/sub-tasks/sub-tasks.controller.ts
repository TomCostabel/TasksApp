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

  @Get()
  findAll() {
    return this.subTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubTaskDto: UpdateSubTaskDto) {
    return this.subTasksService.update(+id, updateSubTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subTasksService.remove(+id);
  }
}
