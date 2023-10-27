import { Filter } from '@app/common/core/domain/repository/filter.interface';
import { Dto } from '../service/dto/dto';
import { ErrorDto } from "@app/common/core/application/service/dto/error.dto";

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Service<D extends Dto<ID>, ID> {
  findById(id: ID): Promise<D | null>;

  find(filter?: Filter<ID>): Promise<D[]>;

  save(dto: D): Promise<D | ErrorDto>;

  delete(id: ID): Promise<boolean>;
}
