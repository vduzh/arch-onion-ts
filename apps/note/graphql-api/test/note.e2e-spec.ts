import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const DTO_1 = { id: '1', title: 'First note' };
const DTO_2 = { id: '2', title: 'Second note' };

const DTOS = [DTO_1, DTO_2];

const gql = '/graphql';

describe('NoteResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get the notes array', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `{
          notes {
            id 
            title
          }
      }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.notes).toMatchObject(DTOS);
      });
  });

  it('should get a single note', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `query($noteId: ID!) {
          note(id: $noteId) {
            id
            title
          }
        }`,
        variables: { noteId: DTO_1.id },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.note).toMatchObject(DTO_1);
      });
  });

  it('should add a note', async () => {
    const input = { title: 'Third Note' };

    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation($note: NoteInput!) {
          saveNote(note: $note) {
            id
            title
          }
        }`,
        variables: { note: input },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.saveNote).toMatchObject({ id: '3', ...input });
      });
  });

  it('should save the note', async () => {
    const input = { id: '1', title: 'Second Note Updated' };

    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation($note: NoteInput!) {
          saveNote(note: $note) {
            id
            title
          }
        }`,
        variables: { note: input },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.saveNote).toMatchObject(input);
      });
  });

  it('should not save the note as it does not exisat in the repo', async () => {
    const input = { id: '0', title: 'foo' };

    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation($note: NoteInput!) {
          saveNote(note: $note) {
            id
            title
          }
        }`,
        variables: { note: input },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.saveNote).toBeNull();
      });
  });

  it('should delete the note', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation($noteId: ID!) {
          deleteNote(id: $noteId)
        }`,
        variables: { noteId: '1' },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteNote).toBeTruthy();
      });
  });

  it('should return false as item is not found', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation($noteId: ID!) {
          deleteNote(id: $noteId)
        }`,
        variables: { noteId: '0' },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteNote).toBeFalsy();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
