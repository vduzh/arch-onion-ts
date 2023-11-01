import { RestDto } from '@app/common/infrastructure/rest-api';

export class NoteRestDto extends RestDto<string> {
  title?: string;
}
