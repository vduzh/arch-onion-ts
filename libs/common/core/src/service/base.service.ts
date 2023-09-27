import { BaseModel } from '../domain/model/base.model';
import { Filter } from '../repository/filter.interface';
import { Repository } from '../repository/repository.interface';

/**
 * The Service layer holds interfaces with common operations, such as Add, Save, Edit, and Delete.
 * Also, this layer is used to communicate between the UI layer and repository layer.
 * The Service layer also could hold business logic for an entity. In this layer,
 * service interfaces are kept separate from its implementation, keeping loose coupling and
 * separation of concerns in mind.
 */
export class BaseService<T extends BaseModel<ID>, ID> {
  constructor(protected repository: Repository<T, ID>) {}

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
