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

  it('should return NOT_FOUND exception when getting a note by incorrect id', async () => {
    service.findById = jest.fn().mockResolvedValue(null);

    expect.assertions(1);
    try {
      await controller.getById('0');
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      const e = err as HttpException;
      expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);
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

  it('should return NOT_FOUND exception when updating a note by incorrect id', async () => {
    const errorDto: ErrorDto = {
      name: ErrorName.NOT_FOUND,
      message: 'The note is not found.',
    };
    service.save = jest.fn().mockResolvedValue(errorDto);

    expect.assertions(1);
    try {
      await controller.update({ title: 'Foo' }, '0');
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      const e = err as HttpException;
      expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);
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

  it('should delete a note', async () => {
    service.delete = jest.fn().mockResolvedValue(true);

    await controller.delete('1');
    expect(service.delete).toHaveBeenCalled();
  });

  it('should delete return 404 code', async () => {
    service.delete = jest.fn().mockResolvedValue(false);

    try {
      await controller.delete('1');
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      const e = err as HttpException;
      expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);
    }

    expect(service.delete).toHaveBeenCalled();
  });
});
