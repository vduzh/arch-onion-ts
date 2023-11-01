import { RestDto } from '@app/common/infrastructure/rest-api';

export class NoteRestPatchDTO extends RestDto<string> {
  title?: string;
}
