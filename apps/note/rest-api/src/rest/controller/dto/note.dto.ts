import { Dto } from '@app/common/infrastructure/rest-api';

export class NoteDto extends Dto<string> {
  title?: string;
}
