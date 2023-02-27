import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ChangeOrderDto } from './dto/change-order.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import NoteEntity from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private notesRepository: Repository<NoteEntity>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    try {
      const newNote = await this.notesRepository.save(createNoteDto);
      return newNote;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const notes = await this.notesRepository.find({
      order: {
        order: 'ASC',
      },
    });

    return notes;
  }

  async findAllWithPagination(page: number) {
    const take = 5;
    const skip = (page - 1) * take;
    const notes = await this.notesRepository.find({
      order: {
        order: 'ASC',
      },
      take: take,
      skip: skip,
    });
    const count = await this.notesRepository.count();

    return { notes: notes, count: count };
  }

  async findLastNote() {
    const notes = await this.notesRepository.find({
      order: {
        order: 'DESC',
      },
      take: 1,
    });

    return notes;
  }

  async findAllTags() {
    const tags = await this.notesRepository
      .createQueryBuilder()
      .select('tags')
      .distinct(true)
      .getRawMany();

    let tagsArray = [];

    tags.map(
      (item) =>
        (tagsArray = tagsArray
          .concat(item.tags.split(' '))
          .filter((tag) => tag)),
    );
    return Array.from(new Set(tagsArray));
  }

  async findByTags(tags: string) {
    const notes = await this.notesRepository.find({
      where: {
        tags: Like(`%${tags}%`),
      },
      order: {
        order: 'ASC',
      },
    });

    return notes;
  }

  async findOne(id: string) {
    const note = await this.notesRepository.findOneBy({ id });
    return note;
  }

  async countNotes() {
    const count = await this.notesRepository.count();

    return count;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.notesRepository.update(id, updateNoteDto);
    const note = await this.notesRepository.findOneBy({ id });

    return note;
  }

  async updateOrder(updateNoteDto: ChangeOrderDto) {
    const firstNote = await this.notesRepository.findOneBy({
      id: updateNoteDto.firstNoteId,
    });
    const secondNote = await this.notesRepository.findOneBy({
      id: updateNoteDto.secondNoteId,
    });

    await this.notesRepository.update(updateNoteDto.firstNoteId, {
      order: secondNote.order,
    });
    await this.notesRepository.update(updateNoteDto.secondNoteId, {
      order: firstNote.order,
    });

    return true;
  }

  async remove(id: string) {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new HttpException('No note with this ID found', 404);
    }
    await this.notesRepository.delete(id);
    return `Note ${id} has been deleted`;
  }
}
