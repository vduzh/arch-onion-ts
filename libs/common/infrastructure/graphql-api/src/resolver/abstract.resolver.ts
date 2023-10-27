import { BasicInput } from '../types/basic.input';
import { BasicType } from '../types/basic.type';
import { Model } from '@app/common/core/domain';
import { Service } from '@app/common/core/application';

export abstract class AbstarctResolver<
  D extends BasicType<ID>,
  M extends Model<ID>,
  I extends BasicInput<ID>,
  P extends BasicInput<ID>,
  ID,
> {
  constructor(protected service: Service<M, ID>) {}

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
