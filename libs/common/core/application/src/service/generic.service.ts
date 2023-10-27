import { Model } from '@app/common/core/domain/model/model';
import { Filter } from '@app/common/core/domain/repository/filter.interface';
import { Repository } from '@app/common/core/domain/repository/repository.interface';
import { Service } from './service';

/**
 * The Generic implementation if the Service
 */
export class GenericService<T extends Model<ID>, ID> implements Service<T, ID> {
  constructor(protected readonly repository: Repository<T, ID>) {}

  findById(id: ID): Promise<T | null> {
    return this.repository.findById(id);
  }

  find(filter: Filter<ID> = {}): Promise<T[]> {
    return this.repository.find(filter);
  }

  save(obj: T): Promise<T | null> {
    return this.repository.save(obj);
  }

  delete(id: ID): Promise<boolean> {
    return this.repository.delete(id);
  }
}
