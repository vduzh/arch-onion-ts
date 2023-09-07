import { Get, Param } from '@nestjs/common';
import { BaseModel, BaseService } from '@app/common/core';

export class BaseController<T extends BaseModel<ID>, ID> {
  constructor(protected readonly service: BaseService<T, ID>) {}

  @Get()
  getAll(): T[] {
    return this.service.find();
    //return { ...model };
  }

  @Get(':id')
  getById(@Param('id') id: ID): T {
    return this.service.findById(id);
    //return { ...model };
  }
}
