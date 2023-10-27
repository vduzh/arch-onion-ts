import { Model } from '@app/common/core/domain/model/model';
import { Filter } from '@app/common/core/domain/repository/filter.interface';

/**
 * The Service layer holds interfaces with common operations, such as Add, Save, Edit, and Delete.
 *
 * Also, this layer is used to communicate between the UI layer and repository layer.
 *
 * The Service layer also could hold business logic (implement use cases) for an entity:
 * - Create an order
 * - Add items to the order
 * - Checkout the order
 *
 * In this layer, service interfaces are kept separate from its implementation, keeping loose coupling
 * and separation of concerns in mind.
 */
export interface Service<T extends Model<ID>, ID> {
  findById(id: ID): Promise<T | null>;

  find(filter?: Filter<ID>): Promise<T[]>;

  save(obj: T): Promise<T | null>;

  delete(id: ID): Promise<boolean>;
}
