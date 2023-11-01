import { BasicModel } from '../model/basic.model';
import { Filter } from './filter';

/**
 * This layer creates an abstraction between the domain entities and business logic of an application.
 *
 * In this layer, we typically add interfaces that provide object saving and retrieving behavior typically
 * by involving a database.
 *
 * This layer consists of the data access pattern, which is a more loosely coupled approach to data access.
 * We also create a generic repository, and add queries to retrieve data from the source, map the data from
 * data source to a business entity, and persist changes in the business entity to the data source.
 *
 * NOTE: You cannot use interfaces since they are not present at runtime, but you can use an abstract class.
 */
export abstract class Repository<T extends BasicModel<ID>, ID> {
  abstract findById(id: ID): Promise<T | null>;

  abstract find(filter?: Filter<ID>): Promise<T[]>;

  abstract save(obj: T): Promise<T | null>;

  abstract delete(id: ID): Promise<boolean>;
}
