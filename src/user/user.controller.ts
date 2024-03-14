// user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: User, @Res() res: Response): Promise<any> {
    const { name, email, password } = body;
    try {
      const createUserResult = await this.userService.createUser(
        name,
        email,
        password,
      );

      if (createUserResult.status === 201) {
        res.status(201).json({
          message: createUserResult.message,
          user: createUserResult.user,
        });
      } else if (createUserResult.status === 400) {
        res.status(400).json({ message: createUserResult.message });
      } else {
        res.status(createUserResult.status).json({
          message: createUserResult.message,
          error: createUserResult.error,
        });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  @Get()
  async showUsers(@Res() res: Response): Promise<any> {
    const showuser = await this.userService.showUsers();
    try {
      if (showuser.status === 201) {
        res.status(201).json({
          message: showuser.message,
          result: showuser.users,
        });
      } else if (showuser.status === 404) {
        res.status(404).json({ message: showuser.message });
      } else {
        res
          .status(showuser.status)
          .json({ message: showuser.message, error: showuser.error });
      }
    } catch (error: any) {
      console.error('Error fetching user CRUD operations:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  async showUserById(
    @Param('id') userId: string,
    @Res() res: Response,
  ): Promise<any> {
    const showuser = await this.userService.showUserById(userId);
    try {
      if (showuser.status === 201) {
        res.status(201).json({
          message: showuser.message,
          result: showuser.users,
        });
      } else if (showuser.status === 404) {
        res.status(404).json({ message: showuser.message });
      } else {
        res
          .status(showuser.status)
          .json({ message: showuser.message, error: showuser.error });
      }
    } catch (error: any) {
      console.error('Error fetching user CRUD operations:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updatedUser: User,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.updateUser(updatedUser, userId);

      if (result.status === 201) {
        res.status(201).json({
          message: result.message,
          updateUser: result.updatedUser,
        });
      } else if (result.status === 404) {
        res.status(404).json({ message: result.message });
      } else {
        res
          .status(result.status)
          .json({ message: result.message, error: result.error });
      }
    } catch (error) {
      console.error('Error updating CRUD operation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') userId: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const deletedUser = await this.userService.deleteUser(userId);

      if (deletedUser.status === 201) {
        res.status(201).json({
          message: deletedUser.message,
          deleteUser: deletedUser.deleted,
        });
      } else if (deletedUser.status === 404) {
        res.status(404).json({ message: deletedUser.message });
      } else {
        res
          .status(deletedUser.status)
          .json({ message: deletedUser.message, error: deletedUser.error });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}
