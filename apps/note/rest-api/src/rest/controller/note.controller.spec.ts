import { HttpException, HttpStatus } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from '@app/note/core/application';
import { ErrorDto, ErrorName } from '@app/common/core/application';

const NOTE_1 = { id: '1', title: 'First note' };
const NOTE_2 = { id: '2', title: 'Second note' };

const DTO_1 = { id: '1', title: 'First note' };
const DTO_2 = { id: '2', title: 'Second note' };

describe('NoteController', () => {
  let controller: NoteController;
  let service: NoteService;

  beforeEach(async () => {
    service = {} as NoteService;
    controller = new NoteController(service);
  });

  it('should return the list of notes', async () => {
    service.find = jest.fn().mockResolvedValue([DTO_1, DTO_2]);

    const notes = await controller.getAll();

    expect(service.find).toHaveBeenCalled();
    expect(notes).toMatchObject([NOTE_1, NOTE_2]);
  });

  it('should return a note by id', async () => {
    service.findById = jest.fn().mockResolvedValue(DTO_1);

    const note = await controller.getById(NOTE_1.id);

    expect(service.findById).toHaveBeenCalled();
    expect(note).toMatchObject(NOTE_1);
  });

  it('should return 404 when getting a note', async () => {
    service.findById = jest.fn().mockResolvedValue(null);

    expect.assertions(3);
    try {
      await controller.getById('0');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect((e as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
    }

    expect(service.findById).toHaveBeenCalled();
  });

  it('should add a note', async () => {
    const dto = { id: '3', title: 'Third note' };
    service.save = jest.fn().mockResolvedValue(dto);

    const newNote = { title: 'Third note' };
    const note = await controller.add(newNote);

    expect(service.save).toHaveBeenCalled();
    expect(note).toMatchObject({ ...newNote, id: note.id });
  });

  it('should update a note', async () => {
    const dto = { id: '1', title: 'First note updated' };
    service.save = jest.fn().mockResolvedValue(dto);

    const updateNote = { title: 'First note updated' };
    const note = await controller.update(updateNote, dto.id);

    expect(service.save).toHaveBeenCalled();
    expect(note).toMatchObject({ ...updateNote, id: dto.id });
  });

  it('should return 404 while updating a note', async () => {
    const errorDto = new ErrorDto(
      ErrorName.NOT_FOUND,
      'The note is not found.',
    );
    service.save = jest.fn().mockResolvedValue(errorDto);

    expect.assertions(3);
    try {
      await controller.update({ title: 'Foo' }, '0');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect((e as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
    }
    expect(service.save).toHaveBeenCalled();
  });

  it('should patch a note', async () => {
    const dto = { id: '1', title: 'First note' };
    service.findById = jest.fn().mockResolvedValue(dto);

    const noteDto = { id: '1', title: 'First note updated' };
    const saveMock = jest.fn();
    service.save = saveMock.mockResolvedValue(noteDto);

    const patchNote = { title: 'First note updated' };
    const note = await controller.patch(patchNote, dto.id);

    expect(service.findById).toHaveBeenCalled();
    expect(service.save).toHaveBeenCalled();
    expect(saveMock.mock.calls[0][0]).toMatchObject(noteDto);
    expect(note).toMatchObject({ ...patchNote, id: dto.id });
  });

  it('should return 404 while patching a note', async () => {
    service.findById = jest.fn().mockResolvedValue(null);

    const errorDto = new ErrorDto(
      ErrorName.NOT_FOUND,
      'The note is not found.',
    );
    service.save = jest.fn().mockResolvedValue(errorDto);

    expect.assertions(4);
    try {
      await controller.patch({ title: 'foo' }, '0');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect((e as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
    }
    expect(service.findById).toHaveBeenCalled();
    expect(service.save).toHaveBeenCalled();
  });

  it('should delete a note', async () => {
    service.delete = jest.fn().mockResolvedValue(true);

    await controller.delete('1');
    expect(service.delete).toHaveBeenCalled();
  });

  it('should return 404 while deleting', async () => {
    service.delete = jest.fn().mockResolvedValue(false);

    expect.assertions(3);
    try {
      await controller.delete('1');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect((e as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
    }

    expect(service.delete).toHaveBeenCalled();
  });
});
