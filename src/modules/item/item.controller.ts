import { CreateItemDto } from './dto/CreateItemDto';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateItemDto } from './dto/UpdateItemDto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateItemDto: UpdateItemDto, @Param() id: string) {
    return this.itemService.update(updateItemDto, id);
  }
}
