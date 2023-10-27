import { Dto } from '@app/common/infrastructure/rest-api';

export class NotePatchDto extends Dto<string> {
  title?: string;
}
