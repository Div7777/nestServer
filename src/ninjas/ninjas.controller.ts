import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Controller('ninjas')
export class NinjasController {
  //Get /ninjas?type=fase --> []
  @Get()
  getNinja(@Query('type') type: string) {
    return [{ type }];
  }

  //Get /ninjas/:id--> { .. }
  @Get(':id')
  getOneNinja(@Param('id') id: string) {
    return { id };
  }
  //Post /ninjas/
  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return { name: createNinjaDto.name };
  }

  //Put/ninjas/:id --> { ... }
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return { id, name: updateNinjaDto };
  }
  //Delete /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return { id };
  }
}
