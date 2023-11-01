import { BasicModel } from '@app/common/core/domain/model/basic.model';
import { Filter, Repository } from '@app/common/core/domain';
import { Service } from './service';
import { AppDto } from './dto/app.dto';
import { ErrorDto, ErrorName } from './dto/error.dto';

/**
 * The Generic implementation if the Service
 */
// TODO: Handle errors
export abstract class ServiceImpl<
  D extends AppDto<ID>,
  M extends BasicModel<ID>,
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

    const res = model
      ? this.modelToDto(model)
      : {
          name: ErrorName.NOT_FOUND,
          message: `There is no data with id ${dto.id}`,
        };

    return Promise.resolve(res);
  }

  async delete(id: ID): Promise<boolean> {
    return this.repository.delete(id);
  }
}
