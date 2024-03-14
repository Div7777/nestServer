import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { User } from './user.schema';
import { User as UserModel } from './graphql';
import { UserService } from './user.service';
import { AddUserArgs } from './args/add.Users.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [User], { name: 'Users' })
  getAllUsers(): UserModel[] {
    return this.userService.findAllUsers();
  }

  @Query(() => User, { name: 'findUserById', nullable: true })
  getUserById(
    @Args({ name: 'userId', type: () => String }) id: string,
  ): UserModel {
    return this.userService.findUserById(id);
  }

  @Mutation(() => String, { name: 'deleteUser' })
  deleteUserById(
    @Args({ name: 'userId', type: () => String }) id: string,
  ): string {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => String, { name: 'addUser' })
  addUser(@Args('addUsers') addUser: AddUserArgs): string {
    console.log(addUser);
    return this.userService.addUser(addUser);
  }

  @Mutation(() => String, { name: 'updateUser' })
  updateUser(
    @Args('updateUsers') updateUser: AddUserArgs,
    @Args({ name: 'userId', type: () => String }) id: string,
  ): string {
    return this.userService.updateUser(id, updateUser);
  }
}
