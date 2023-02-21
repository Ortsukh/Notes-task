import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import NoteEntity from './src/notes/entities/note.entity';
import { migration1676467478449 } from './src/migrations/1676467478449-migration';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('TYPEORM_HOST'),
  port: configService.get('TYPEORM_PORT'),
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get('TYPEORM_DATABASE'),
  entities: [NoteEntity],
  migrations: [migration1676467478449],
});
