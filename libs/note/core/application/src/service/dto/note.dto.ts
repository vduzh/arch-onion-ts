import { AppDto } from '@app/common/core/application';

export class NoteDto extends AppDto<string> {
  title?: string;
}
