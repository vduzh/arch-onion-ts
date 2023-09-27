import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('NoteController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/notes (GET)', async () => {
    const expected = [
      { id: '1', title: 'First note' },
      { id: '2', title: 'Second note' },
    ];

    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect(expected);
  });

  it('/notes/1 (GET)', async () => {
    const expected = { id: '1', title: 'First note' };

    return request(app.getHttpServer())
      .get('/notes/1')
      .expect(200)
      .expect(expected);
  });

  it('/notes/0 (GET 404)', async () => {
    return request(app.getHttpServer()).get('/notes/0').expect(404);
  });

  it('/notes (POST)', async () => {
    const dto = { title: 'New note' };
    const expected = { title: 'New note' };

    return request(app.getHttpServer())
      .post('/notes')
      .send(dto)
      .expect(201)
      .expect({ id: '3', ...expected });
  });

  it('/notes/1 (PUT)', async () => {
    const dto = { title: 'Updated note' };
    const expected = { id: '1', title: dto.title };

    return request(app.getHttpServer())
      .put('/notes/1')
      .send(dto)
      .expect(200)
      .expect(expected);
  });

  it('/notes/0 (404)', async () => {
    return request(app.getHttpServer())
      .put('/notes/0')
      .send({ title: 'Updated note' })
      .expect(404);
  });

  it('/notes/1 (PATCH)', async () => {
    const dto = { title: 'Updated note' };
    const expected = { id: '1', title: dto.title };

    return request(app.getHttpServer())
      .patch('/notes/1')
      .send(dto)
      .expect(200)
      .expect(expected);
  });

  it('/notes/0 (PATCH 404)', async () => {
    return request(app.getHttpServer())
      .patch('/notes/0')
      .send({ title: 'Updated note' })
      .expect(404);
  });

  it('/notes/1 (DELETE)', async () => {
    return request(app.getHttpServer()).delete('/notes/1').expect(200);
  });

  it('/notes/1 (DELETE 404)', async () => {
    return request(app.getHttpServer()).delete('/notes/0').expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
