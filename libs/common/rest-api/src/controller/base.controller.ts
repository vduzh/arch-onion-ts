import { Get, Param } from '@nestjs/common';
import { BaseModel, BaseService } from '@app/common/core';
import { BaseDTO } from './dto/base.dto';

export abstract class BaseController<
  D extends BaseDTO<ID>,
  M extends BaseModel<ID>,
  ID,
> {
  constructor(protected readonly service: BaseService<M, ID>) {}

  public abstract toDTO(model: M): D;

  public abstract toModel(dto: D): M;

  @Get()
  getAll(): D[] {
    return this.service.find().map((model) => this.toDTO(model));
  }

  @Get(':id')
  getById(@Param('id') id: ID): D {
    return this.toDTO(this.service.findById(id));
  }
}
