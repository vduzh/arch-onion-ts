import { BaseDto } from '@app/common/rest-api';

export class NoteDto extends BaseDto<string> {
  title?: string;
}
