import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { Ninja } from './ninja.model';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'ninjaA', weapon: 'stars' },
    { id: 1, name: 'ninjaB', weapon: 'guns' },
  ];
  constructor(
    @InjectModel('Ninja') private readonly NinjaModel: Model<Ninja>,
  ) {}

  getNinjas(weapon: string) {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getNinja(id: number) {
    //  console.log(typeof this.ninjas[0].id);
    const ninja = this.ninjas.find((ninja) => ninja.id == id);
    if (!ninja) {
      throw new Error('ninja not found');
    }
    return ninja;
  }

  async createNinja(createNinjaDto: CreateNinjaDto): Promise<Ninja> {
    const newNinja = new this.NinjaModel(createNinjaDto);
    return newNinja.save();
  }

  updateNinja(id: number, updateNinja: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id == id) {
        return { ...ninja, ...updateNinja };
      }
      return ninja;
    });
    return this.getNinja(id);
  }

  removeNinja(id: number) {
    const removedNinja = this.getNinja(id);
    this.ninjas = this.ninjas.filter((ninja) => ninja.id != id);
    return removedNinja;
  }
}
