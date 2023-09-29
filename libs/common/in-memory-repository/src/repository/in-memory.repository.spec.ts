import { BaseModel } from '@app/common/core';
import { InMemoryRepository } from './in-memory.repository';

export class Item extends BaseModel<string> {
  name: string;
}

const DB = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Lemon' },
];

describe('InMemoryBaseRepostory', () => {
  let repository: InMemoryRepository<Item, string>;
  let database = [];

  beforeEach(async () => {
    database = [...DB];
    repository = new InMemoryRepository<Item, string>(database);
  });

  it('should return item by id', async () => {
    expect(await repository.findById('1')).toMatchObject(database[0]);
  });

  it('should return null if item does not exist', async () => {
    expect(await repository.findById('0')).toBeNull();
  });

  it('should return all the items', async () => {
    expect(await repository.find()).toMatchObject(database);
  });

  it('should add a new item', async () => {
    const data = { name: 'foo' };
    const res = await repository.save(data);
    expect(database.length).toBe(3);
    expect(res).toMatchObject({ id: '3', ...data });
  });

  it('should update the existing item', async () => {
    const data = { id: '2', name: 'foo' };
    const res = await repository.save(data);
    expect(database.length).toBe(2);
    expect(res).toMatchObject(data);
  });

  it('should return null if the item does not exit', async () => {
    const data = { id: '0', name: 'foo' };
    const res = await repository.save(data);
    expect(database.length).toBe(2);
    expect(res).toBeNull();
  });

  it('should delete an item and return true', async () => {
    expect(await repository.delete('1')).toBeTruthy();
    expect(database.length).toBe(1);
  });

  it('should return false when the item is not in a repository', async () => {
    expect(await repository.delete('0')).toBeFalsy();
    expect(database.length).toBe(2);
  });
});
