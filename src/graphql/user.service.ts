// user.service.ts
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  public UserData: UserEntity[] = [];

  addUser(user: UserEntity): string {
    this.UserData.push(user);
    return 'add successfully';
  }

  updateUser(id: string, updateUser: UserEntity): string {
    this.UserData = this.UserData.map((user) => {
      if (user.id == id) {
        return { ...user, ...updateUser };
      }
      return user;
    });
    return 'update successfuly';
  }

  deleteUser(id: string) {
    // const removedNinja = this.getNinja(id);
    this.UserData = this.UserData.filter((user) => user.id != id);
    return 'delete successfully';
  }

  findUserById(id: string): UserEntity {
    //  console.log(typeof this.ninjas[0].id);
    console.log(id);
    const ninja = this.UserData.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('ninja not found');
    }
    return ninja;
  }

  findAllUsers(): UserEntity[] {
    return this.UserData;
  }
}
