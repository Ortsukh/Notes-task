import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ChangeOrderDto } from './dto/change-order.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get('/last')
  findLastNote() {
    return this.notesService.findLastNote();
  }

  @Get('/page')
  findAllWithPagination(@Query() { page }: { page: number }) {
    return this.notesService.findAllWithPagination(page);
  }

  @Get('/tags')
  findByTags(@Query() { tags }: { tags: string }) {
    return this.notesService.findByTags(tags);
  }

  @Get('/all-tags')
  findAllTags() {
    return this.notesService.findAllTags();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Put('/order')
  updateOrder(@Body() updateNoteDto: ChangeOrderDto) {
    console.log(updateNoteDto);

    return this.notesService.updateOrder(updateNoteDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    console.log('updateNoteDto', updateNoteDto);

    return this.notesService.update(id, updateNoteDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
