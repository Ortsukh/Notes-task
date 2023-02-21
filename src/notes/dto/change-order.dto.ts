import { IsString } from 'class-validator';

export class ChangeOrderDto {
  @IsString()
  firstNoteId: string;

  @IsString()
  secondNoteId: string;
}
