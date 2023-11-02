import { Body, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { AppDto, ErrorDto, ErrorName, Service } from "@app/common/core/application";
import { RestDto } from "./dto/rest-dto";

export abstract class BasicController<
  ID,
  A extends AppDto<ID>,
  R extends RestDto<ID>,
  P extends RestDto<ID>,
> {
  protected constructor(protected readonly service: Service<A, ID>) {}

  public abstract toRestDto(appDto: A): R;

  public abstract toAppDto(restDto: R): A;

  @Get()
  async getAll(): Promise<R[]> {
    return (await this.service.find()).map((model) => this.toRestDto(model));
  }

  @Get(':id')
  async getById(@Param('id') id: ID): Promise<R> {
    const obj = await this.service.findById(id);
    if (!obj) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.toRestDto(obj);
  }

  @Post()
  async add(@Body() res: R): Promise<R> {
    const value = await this.service.save(this.toAppDto(res));
    if (value instanceof ErrorDto) {
      const e = value as ErrorDto;
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
    return this.toRestDto(value);
  }

  @Put(':id')
  async update(@Body() res: R, @Param('id') id: ID): Promise<R> {
    const value = await this.service.save(this.toAppDto({ ...res, id }));
    if (value instanceof ErrorDto) {
      const e = value as ErrorDto;
      if (e.name === ErrorName.NOT_FOUND) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.toRestDto(value);
  }

  @Patch(':id')
  async patch(@Body() res: P, @Param('id') id: ID): Promise<R> {
    const patchedDto = {
      ...this.toRestDto(await this.service.findById(id)),
      ...res,
      id,
    };

    const value = await this.service.save(this.toAppDto(patchedDto));
    if (value instanceof ErrorDto) {
      const e = value as ErrorDto;
      if (e.name === ErrorName.NOT_FOUND) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.toRestDto(value);
  }

  @Delete(':id')
  async delete(@Param('id') id: ID): Promise<void> {
    if (!(await this.service.delete(id))) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
