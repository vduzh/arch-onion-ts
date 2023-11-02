import { BasicInput } from '../types/basic.input';
import { BasicType } from '../types/basic.type';
import { Service, AppDto, ErrorDto } from '@app/common/core/application';

export abstract class BasicResolver<
  ID,
  D extends AppDto<ID>,
  T extends BasicType<ID>,
  I extends BasicInput<ID>,
  P extends BasicInput<ID>,
> {
  protected constructor(protected service: Service<D, ID>) {}

  public abstract inputToType(input: I): T;

  public abstract typeToDto(t: T): D;

  public abstract dtoToType(dto: D): T;

  async list(): Promise<T[]> {
    return (await this.service.find()).map((model) => this.dtoToType(model));
  }

  async get(id: ID): Promise<T | null> {
    return this.dtoToType(await this.service.findById(id));
  }

  async save(input: I): Promise<T | null> {
    const t = this.inputToType(input);
    const value = await this.service.save(this.typeToDto(t));

    if (value instanceof ErrorDto) {
      return Promise.resolve(null);
    }

    return this.dtoToType(value);
  }

  async patch(input: P): Promise<T | null> {
    const patchedDto = {
      ...this.dtoToType(await this.service.findById(input.id)),
      ...input,
    };

    const value = await this.service.save(this.typeToDto(patchedDto));
    if (value instanceof ErrorDto) {
      return null;
    }
    return this.dtoToType(value);
  }

  async delete(id: ID): Promise<boolean> {
    return this.service.delete(id);
  }
}
