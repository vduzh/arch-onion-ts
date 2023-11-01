import { ErrorDto, ErrorName } from '@app/common/core/application';

import { Note, NoteRepository } from '@app/note/core/domain';
import { NoteDto, NoteService, NoteServiceImpl } from '@app/note/core/application';

const NOTE_1: Note = { id: '1', title: 'First note' };
const NOTE_2: Note = { id: '2', title: 'Second note' };

const DTO_1: NoteDto = { id: '1', title: 'First note' };
const DTO_2: NoteDto = { id: '2', title: 'Second note' };

describe('NoteService', () => {
  let service: NoteService;
  let repository: NoteRepository;

  beforeEach(async () => {
    repository = {} as NoteRepository;
    service = new NoteServiceImpl(repository);
  });

  it('should find item by id', async () => {
    repository.findById = jest.fn().mockResolvedValue(NOTE_1);

    const noteDto = await service.findById(NOTE_1.id);

    expect(repository.findById).toHaveBeenCalled();
    expect(noteDto).toMatchObject(DTO_1);
  });

  it('should return null if item does not exist', async () => {
    repository.findById = jest.fn().mockResolvedValue(null);

    const noteDto = await service.findById('0');

    expect(repository.findById).toHaveBeenCalled();
    expect(noteDto).toBeNull();
  });

  it('should return all the items', async () => {
    repository.find = jest.fn().mockResolvedValue([NOTE_1, NOTE_2]);

    const noteDtos = await service.find();

    expect(repository.find).toHaveBeenCalled();
    expect(noteDtos).toMatchObject([DTO_1, DTO_2]);
  });

  it('should add a new item', async () => {
    const note = { id: '3', title: 'foo' };
    repository.save = jest.fn().mockResolvedValue(note);

    const dto = { title: note.title };
    const res = await service.save(dto);

    expect(repository.save).toHaveBeenCalled();
    expect(res).toMatchObject({ id: '3', ...dto });
  });

  it('should update the existing item', async () => {
    const note = { id: '2', title: 'foo' };
    repository.save = jest.fn().mockResolvedValue(note);

    const dto = { title: note.title };
    const res = await service.save(dto);

    expect(repository.save).toHaveBeenCalled();
    expect(res).toMatchObject({ id: '2', ...dto });
  });

  it('should return error if the item does not exit', async () => {
    repository.save = jest.fn().mockResolvedValue(null);

    const dto = { id: '3', title: 'foo' };

    const err = (await service.save(dto)) as ErrorDto;
    expect(err.name).toBe(ErrorName.NOT_FOUND);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete an item and return true', async () => {
    repository.delete = jest.fn().mockResolvedValue(true);

    const deleted = await service.delete('1');

    expect(repository.delete).toHaveBeenCalled();
    expect(deleted).toBeTruthy();
  });

  it('should return false when the item is not in a service', async () => {
    repository.delete = jest.fn().mockResolvedValue(false);

    const deleted = await service.delete('0');

    expect(repository.delete).toHaveBeenCalled();
    expect(deleted).toBeFalsy();
  });
});
