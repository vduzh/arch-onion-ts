import { Model } from '@app/common/core/domain/model/model';
import { Filter, Repository } from '@app/common/core/domain';
import { Service } from './service';
import { Dto } from './dto/dto';
import { ErrorDto } from './dto/error.dto';

/**
 * The Generic implementation if the Service
 */
// TODO: Handle errors
export abstract class AbstractService<
  D extends Dto<ID>,
  M extends Model<ID>,
  ID,
> implements Service<D, ID>
{
  protected constructor(protected readonly repository: Repository<M, ID>) {}

  protected abstract dtoToModel(dto: D): M;
  protected abstract modelToDto(model: M): D;

  async findById(id: ID): Promise<D | null> {
    const model = await this.repository.findById(id);
    return model ? Promise.resolve(this.modelToDto(model)) : null;
  }

  async find(filter: Filter<ID> = {}): Promise<D[]> {
    const result = await this.repository.find(filter);
    return Promise.resolve(result.map((model) => this.modelToDto(model)));
  }

  async save(dto: D): Promise<D | ErrorDto> {
    const model = await this.repository.save(this.dtoToModel(dto));
    return Promise.resolve(this.modelToDto(model));
  }

  async delete(id: ID): Promise<boolean> {
    return this.repository.delete(id);
  }
}
