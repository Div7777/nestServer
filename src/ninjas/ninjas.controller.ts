import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { ValidationPipe } from '@nestjs/common';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard) //it is used as authentication when api call
export class NinjasController {
  //behind the scene of constructor
  //const service = new NinjasService();
  //const controller = new NinjasController(service);
  constructor(private readonly ninjaService: NinjasService) {}

  //Get /ninjas?weapon=fase --> []
  @Get()
  getNinja(@Query('weapon') weapon: string) {
    return this.ninjaService.getNinjas(weapon);
  }

  //Get /ninjas/:id--> { .. }
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getNinja(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
  //Post /ninjas/
  @Post()
  async createNinja(
    @Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto,
  ) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  //Put/ninjas/:id --> { ... }
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(+id, updateNinjaDto);
  }
  //Delete /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjaService.removeNinja(+id);
  }
}
