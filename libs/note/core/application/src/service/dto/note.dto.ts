import { Dto } from '@app/common/core/application';

export class NoteDto extends Dto<string> {
  title?: string;
}
