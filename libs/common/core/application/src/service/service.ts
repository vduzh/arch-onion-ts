import { Filter } from '@app/common/core/domain/repository/filter';
import { AppDto } from './dto/app.dto';
import { ErrorDto } from './dto/error.dto';

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
 * and separation of concerns in mind. *
 */
// NOTE: You cannot use interfaces since they are not present at runtime, but you can use an abstract class.
export abstract class Service<D extends AppDto<ID>, ID> {
  abstract findById(id: ID): Promise<D | null>;

  abstract find(filter?: Filter<ID>): Promise<D[]>;

  abstract save(dto: D): Promise<D | ErrorDto>;

  abstract delete(id: ID): Promise<boolean>;
}
