import { BaseDTO } from '@app/common/rest-api';

export class NotePatchDTO extends BaseDTO<string> {
  title?: string;
}
