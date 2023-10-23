import { BaseModel, BaseService } from '@app/common/core';
import { BaseInput } from '../types/base.input';
import { BaseType } from '../types/base.type';

export abstract class BaseResolver<
  D extends BaseType<ID>,
  M extends BaseModel<ID>,
  I extends BaseInput<ID>,
  P extends BaseInput<ID>,
  ID,
> {
  constructor(protected service: BaseService<M, ID>) {}

  public abstract modelToDto(model: M): D;

  public abstract inputToDto(input: I): D;

  public abstract dtoToModel(dto: D): M;

  async list(): Promise<D[]> {
    return (await this.service.find()).map((model) => this.modelToDto(model));
  }

  async get(id: ID): Promise<D | null> {
    return this.modelToDto(await this.service.findById(id));
  }

  async save(input: I): Promise<D | null> {
    const dto = this.inputToDto(input);
    return this.modelToDto(await this.service.save(this.dtoToModel(dto)));
  }

  async pacth(input: P): Promise<D | null> {
    const dto = {
      ...this.modelToDto(await this.service.findById(input.id)),
      ...input,
    };

    return this.modelToDto(await this.service.save(this.dtoToModel(dto)));
  }

  async delete(id: ID): Promise<boolean> {
    return this.service.delete(id);
  }
}
