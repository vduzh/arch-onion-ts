import { NoteService } from '@app/note/core/application';
import { NoteResolver } from './note.resolver';
import { ErrorDto, ErrorName } from '@app/common/core/application';

const NOTE_1 = { id: '1', title: 'First note' };
const NOTE_2 = { id: '2', title: 'Second note' };

const DTO_1 = { id: '1', title: 'First note' };
const DTO_2 = { id: '2', title: 'Second note' };

describe('NoteController', () => {
  let resolver: NoteResolver;
  let service: NoteService;

  beforeEach(async () => {
    service = {} as NoteService;
    resolver = new NoteResolver(service);
  });

  it('should get the list of notes', async () => {
    service.find = jest.fn().mockResolvedValue([DTO_1, DTO_2]);

    const notes = await resolver.notes();

    expect(service.find).toHaveBeenCalled();
    expect(notes).toMatchObject([NOTE_1, NOTE_2]);
  });

  it('should get a note by id', async () => {
    service.findById = jest.fn().mockResolvedValue(NOTE_1);

    const note = await resolver.note(NOTE_1.id);

    expect(service.findById).toHaveBeenCalled();
    expect(note).toMatchObject(DTO_1);
  });

  it('should get null if a note does not exist', async () => {
    service.findById = jest.fn().mockResolvedValue(null);

    const note = await resolver.note('0');

    expect(service.findById).toHaveBeenCalled();
    expect(note).toBeFalsy();
  });

  it('should add a note', async () => {
    const note = { id: '3', title: 'Third note' };
    service.save = jest.fn().mockResolvedValue(note);

    const addDTO = { title: 'Third note' };
    const dto = await resolver.saveNote(addDTO);

    expect(service.save).toHaveBeenCalled();
    expect(dto).toMatchObject({ ...addDTO, id: note.id });
  });

  it('should update a note', async () => {
    const note = { id: '1', title: 'Updated note' };
    service.save = jest.fn().mockResolvedValue(note);

    const updateDto = { id: '1', title: 'Updated note' };
    const dto = await resolver.saveNote(updateDto);

    expect(service.save).toHaveBeenCalled();
    expect(dto).toMatchObject({ ...updateDto, id: note.id });
  });

  it('should return null when the updating note is not found', async () => {
    const errorDto = new ErrorDto(
      ErrorName.NOT_FOUND,
      'The note is not found.',
    );
    service.save = jest.fn().mockResolvedValue(errorDto);

    const updateDto = { id: '0', title: 'Foo' };
    const dto = await resolver.saveNote(updateDto);

    expect(service.save).toHaveBeenCalled();
    expect(dto).toBeNull();
  });

  it('should patch a note', async () => {
    const note = { id: '1', title: 'First note' };
    service.findById = jest.fn().mockResolvedValue(note);

    const savedNote = { id: '1', title: 'First note updated' };
    const saveMock = jest.fn();
    service.save = saveMock.mockResolvedValue(savedNote);

    const patchDTO = { id: '1', title: 'First note updated' };
    const dto = await resolver.patchNote(patchDTO);

    expect(service.findById).toHaveBeenCalled();
    expect(service.save).toHaveBeenCalled();
    expect(saveMock.mock.calls[0][0]).toMatchObject(savedNote);
    expect(dto).toMatchObject({ ...patchDTO, id: note.id });
  });

  it('should return null when the patching note is not found', async () => {
    service.findById = jest.fn().mockResolvedValue(null);

    const errorDto = new ErrorDto(
      ErrorName.NOT_FOUND,
      'The note is not found.',
    );
    service.save = jest.fn().mockResolvedValue(errorDto);

    const dto = await resolver.patchNote({ id: '0', title: 'Foo' });

    expect(service.save).toHaveBeenCalled();
    expect(dto).toBeNull();
  });

  it('should delete a note', async () => {
    service.delete = jest.fn().mockResolvedValue(true);

    const res = await resolver.deleteNote('1');
    expect(service.delete).toHaveBeenCalled();
    expect(res).toBeTruthy();
  });

  it('should return false as the deleted note is not available', async () => {
    service.delete = jest.fn().mockResolvedValue(false);

    const res = await resolver.deleteNote('0');
    expect(service.delete).toHaveBeenCalled();
    expect(res).toBeFalsy();
  });
});
