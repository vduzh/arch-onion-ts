import { Body, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BaseModel, BaseService } from '@app/common/core';
import { BaseDTO } from './dto/base.dto';

export abstract class BaseController<
  D extends BaseDTO<ID>,
  M extends BaseModel<ID>,
  ID,
> {
  constructor(protected readonly service: BaseService<M, ID>) {}

  public abstract toDTO(model: M): D;

  public abstract toModel(dto: D): M;

  @Get()
  async getAll(): Promise<D[]> {
    return (await this.service.find()).map((model) => this.toDTO(model));
  }

  @Get(':id')
  async getById(@Param('id') id: ID): Promise<D> {
    return this.toDTO(await this.service.findById(id));
  }

  @Post()
  async add(@Body() dto: D): Promise<D> {
    return this.toDTO(await this.service.save(this.toModel(dto)));
  }

  @Put(':id')
  async update(@Body() dto: D, @Param('id') id: ID): Promise<D> {
    const newDto = { ...dto, id };
    return this.toDTO(await this.service.save(this.toModel(newDto)));
  }

  @Patch(':id')
  async patchAuthor(@Body() dto: D, @Param('id') id: ID): Promise<D> {
    const patchedDto = {
      ...this.toDTO(await this.service.findById(id)),
      ...dto,
      id,
    };

    return this.toDTO(await this.service.save(this.toModel(patchedDto)));
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: ID): Promise<boolean> {
    return await this.service.delete(id);
  }
}
