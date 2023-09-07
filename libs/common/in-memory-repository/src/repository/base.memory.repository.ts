import { Injectable } from '@nestjs/common';
import { Filter, BaseModel, Repository } from '@app/common/core';

@Injectable()
export class InMemoryBaseRepostory<T extends BaseModel<ID>, ID>
  implements Repository<T, ID>
{
  constructor(protected readonly data: T[] = []) {}

  findById(id: ID): T | null {
    const res = this.data.find((item) => item.id === id);
    return res || null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  find(filter: Filter<ID>): T[] {
    return this.data;
  }

  save(obj: T): T {
    if (!obj.id) {
      // add new element
      const entity = { ...obj, id: this.data.length };
      this.data.push(entity);
      return entity;
    }

    const index = this.data.findIndex((item) => item.id === obj.id);
    if (index) {
      this.data[index] = obj;
      return obj;
    } else {
      this.data.push(obj);
    }
  }

  delete(id: ID): boolean {
    const index = this.data.findIndex((item) => item.id === id);
    if (index) {
      this.data.slice(index, index + 1);
      return true;
    }
    return false;
  }
}
