import { Injectable } from '@nestjs/common';
import { Filter, BaseModel, Repository } from '@app/common/core';

@Injectable()
export class InMemoryBaseRepostory<T extends BaseModel<ID>, ID>
  implements Repository<T, ID>
{
  constructor(protected readonly data: T[] = []) {}

  findById(id: ID): Promise<T | null> {
    const res = this.data.find((item) => item.id === id);
    return Promise.resolve(res || null);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  find(filter: Filter<ID>): Promise<T[]> {
    return Promise.resolve(this.data);
  }

  save(obj: T): Promise<T | null> {
    if (!obj.id) {
      // add a new element
      const newEntity = { ...obj, id: (this.data.length + 1).toString() };
      this.data.push(newEntity);
      return Promise.resolve(newEntity);
    }

    // update an existing element
    const index = this.data.findIndex((item) => item.id === obj.id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    this.data[index] = obj;
    return Promise.resolve(obj);
  }

  delete(id: ID): Promise<boolean> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data.slice(index, index + 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
