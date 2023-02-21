import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import NoteEntity from './src/notes/entities/note.entity';
import { migration1676991645431 } from './src/migrations/1676991645431-migration';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('PGHOST'),
  port: configService.get('PGPORT'),
  username: configService.get('PGUSER'),
  password: configService.get('PGPASSWORD'),
  database: configService.get('PGDATABASE'),
  ssl: true,
  entities: [NoteEntity],
  migrations: [migration1676991645431],
});
