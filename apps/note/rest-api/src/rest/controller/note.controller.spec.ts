import { NoteController } from './note.controller';
import { NoteService } from '@app/note/core';

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
    service.find = jest.fn().mockResolvedValue([NOTE_1, NOTE_2]);

    const dtos = await controller.getAll();

    expect(service.find).toHaveBeenCalled();
    expect(dtos).toMatchObject([DTO_1, DTO_2]);
  });

  it('should return a note by id', async () => {
    service.findById = jest.fn().mockResolvedValue(NOTE_1);

    const dto = await controller.getById(NOTE_1.id);

    expect(service.findById).toHaveBeenCalled();
    expect(dto).toMatchObject(DTO_1);
  });

  it('should add a note', async () => {
    const note = { id: '3', title: 'Third note' };
    service.save = jest.fn().mockResolvedValue(note);

    const addDTO = { title: 'Third note' };
    const dto = await controller.add(addDTO);

    expect(service.save).toHaveBeenCalled();
    expect(dto).toMatchObject({ ...addDTO, id: note.id });
  });

  it('should update a note', async () => {
    const note = { id: '1', title: 'First note updated' };
    service.save = jest.fn().mockResolvedValue(note);

    const updateDTO = { title: 'First note updated' };
    const dto = await controller.update(updateDTO, note.id);

    expect(service.save).toHaveBeenCalled();
    expect(dto).toMatchObject({ ...updateDTO, id: note.id });
  });

  it('should patch a note', async () => {
    const note = { id: '1', title: 'First note' };
    service.findById = jest.fn().mockResolvedValue(note);

    const savedNote = { id: '1', title: 'First note updated' };
    const saveMock = jest.fn();
    service.save = saveMock.mockResolvedValue(savedNote);

    const pacthDTO = { title: 'First note updated' };
    const dto = await controller.patch(pacthDTO, note.id);

    expect(service.findById).toHaveBeenCalled();
    expect(service.save).toHaveBeenCalled();
    expect(saveMock.mock.calls[0][0]).toMatchObject(savedNote);
    expect(dto).toMatchObject({ ...pacthDTO, id: note.id });
  });

  it('should delete a note', async () => {
    service.delete = jest.fn().mockResolvedValue(true);

    const res = await controller.delete('1');

    expect(service.delete).toHaveBeenCalled();
    expect(res).toBeTruthy();
  });
});
