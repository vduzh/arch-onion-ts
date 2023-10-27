import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Dto } from './dto/dto';
import { Model } from '@app/common/core/domain';
import { Service } from '@app/common/core/application';

export abstract class AbstractController<
  D extends Dto<ID>,
  P extends Dto<ID>,
  M extends Model<ID>,
  ID,
> {
  constructor(protected readonly service: Service<M, ID>) {}

  public abstract toDTO(model: M): D;

  public abstract toModel(dto: D): M;

  @Get()
  async getAll(): Promise<D[]> {
    return (await this.service.find()).map((model) => this.toDTO(model));
  }

  @Get(':id')
  async getById(@Param('id') id: ID): Promise<D> {
    const obj = await this.service.findById(id);
    if (!obj) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.toDTO(obj);
  }

  @Post()
  async add(@Body() dto: D): Promise<D> {
    return this.toDTO(await this.service.save(this.toModel(dto)));
  }

  @Put(':id')
  async update(@Body() dto: D, @Param('id') id: ID): Promise<D> {
    const obj = await this.service.save(this.toModel({ ...dto, id }));
    if (!obj) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.toDTO(obj);
  }

  @Patch(':id')
  async patch(@Body() dto: P, @Param('id') id: ID): Promise<D> {
    const patchedDto = {
      ...this.toDTO(await this.service.findById(id)),
      ...dto,
      id,
    };

    const obj = await this.service.save(this.toModel(patchedDto));
    if (!obj) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.toDTO(obj);
  }

  @Delete(':id')
  async delete(@Param('id') id: ID): Promise<void> {
    if (!(await this.service.delete(id))) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
