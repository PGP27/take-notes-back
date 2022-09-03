import { CreateListDto } from './dto/CreateListDto';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { ListService } from './list.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateListDto } from './dto/UpdateListDto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.listService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.listService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateListDto: UpdateListDto, @Param() id: string) {
    return this.listService.update(updateListDto, id);
  }
}
