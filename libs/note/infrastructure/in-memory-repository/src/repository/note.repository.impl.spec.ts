import { Note } from '@app/note/core/domain';
import { NoteRepositoryImpl } from '@app/note/infrastructure/in-memory-repository';

const DB: Note[] = [
  { id: '1', title: 'Apple' },
  { id: '2', title: 'Lemon' },
];

describe('NoteRepositoryImpl', () => {
  let repository: NoteRepositoryImpl;
  let notes: Note[] = [];

  beforeEach(async () => {
    notes = [...DB];
    repository = new NoteRepositoryImpl({ data: notes, name: 'notes' });
  });

  it('should return item by id', async () => {
    expect(await repository.findById('1')).toMatchObject(notes[0]);
  });

  it('should return null if item does not exist', async () => {
    expect(await repository.findById('0')).toBeNull();
  });

  it('should return all the items', async () => {
    expect(await repository.find()).toMatchObject(notes);
  });

  it('should add a new item', async () => {
    const data = { title: 'foo' };
    const res = await repository.save(data);
    expect(notes.length).toBe(3);
    expect(res).toMatchObject({ id: '3', ...data });
  });

  it('should update the existing item', async () => {
    const data = { id: '2', title: 'foo' };
    const res = await repository.save(data);
    expect(notes.length).toBe(2);
    expect(res).toMatchObject(data);
  });

  it('should return null if the item does not exit', async () => {
    const data = { id: '0', title: 'foo' };
    const res = await repository.save(data);
    expect(notes.length).toBe(2);
    expect(res).toBeNull();
  });

  it('should delete an item and return true', async () => {
    expect(await repository.delete('1')).toBeTruthy();
    expect(notes.length).toBe(1);
  });

  it('should return false when the item is not in a repository', async () => {
    expect(await repository.delete('0')).toBeFalsy();
    expect(notes.length).toBe(2);
  });
});
