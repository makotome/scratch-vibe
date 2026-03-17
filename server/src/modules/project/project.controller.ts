import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.projectService.findByUser(userId);
    }
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.projectService.incrementViews(id);
    return this.projectService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() projectData: any, @Request() req: any) {
    return this.projectService.create(projectData, req.user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() projectData: any, @Request() req: any) {
    return this.projectService.update(id, projectData, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Request() req: any) {
    return this.projectService.remove(id, req.user.id);
  }

  @Post(':id/love')
  async love(@Param('id') id: string) {
    await this.projectService.incrementLoves(id);
    return { success: true };
  }

  @Post(':id/favorite')
  @UseGuards(AuthGuard('jwt'))
  async favorite(@Param('id') id: string) {
    await this.projectService.incrementFavorites(id);
    return { success: true };
  }
}
