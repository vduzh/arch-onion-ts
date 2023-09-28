import { BaseDto } from '@app/common/rest-api';

export class NotePatchDto extends BaseDto<string> {
  title?: string;
}
