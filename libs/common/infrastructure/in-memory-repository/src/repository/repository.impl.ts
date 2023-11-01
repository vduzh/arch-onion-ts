import { Filter, BasicModel, Repository } from '@app/common/core/domain';
import { DataSource } from './data.source';

export abstract class RepositoryImpl<T extends BasicModel<ID>, ID>
  implements Repository<T, ID>
{
  protected constructor(protected readonly ds: DataSource<T>) {}

  findById(id: ID): Promise<T | null> {
    const res = this.ds.data.find((item) => item.id === id);
    return Promise.resolve(res || null);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  find(filter?: Filter<ID>): Promise<T[]> {
    return Promise.resolve(this.ds.data);
  }

  save(obj: T): Promise<T | null> {
    if (!obj.id) {
      // add a new element
      const newEntity = { ...obj, id: (this.ds.data.length + 1).toString() };
      this.ds.data.push(newEntity);
      return Promise.resolve(newEntity);
    }

    // update an existing element
    const index = this.ds.data.findIndex((item) => item.id === obj.id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    this.ds.data[index] = obj;
    return Promise.resolve(obj);
  }

  delete(id: ID): Promise<boolean> {
    const index = this.ds.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.ds.data.splice(index, index + 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
