// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
// import { Role } from 'src/role/role.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    // @InjectModel('Role') private readonly roleModel: Model<Role>,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<any> {
    const userExists = await this.userModel.findOne({ email }).exec();
    if (userExists) {
      return { status: 400, message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      // userRole: userRole,
    });
    await newUser.save();
    return {
      status: 201,
      message: 'User created successfully',
      user: newUser,
    };
  }
  catch(error: any) {
    return { status: 500, message: 'Error creating user', error };
  }

  async showUsers(): Promise<any> {
    try {
      const users = await this.userModel
        .find({ delete: false })
        .select('-password');

      if (!users) {
        return { status: 404, message: 'User not found' };
      }

      return {
        status: 201,
        message: 'Users fetch successfully',
        users: users,
      };
    } catch (error) {
      return { status: 500, message: 'Error fetching users', error };
    }
  }

  async showUserById(userId: string): Promise<any> {
    try {
      const users = await this.userModel.findById(userId);

      if (!users) {
        return { status: 404, message: 'User not found' };
      }

      return {
        status: 201,
        message: 'User fetch successfully',
        users: users,
      };
    } catch (error) {
      return { status: 500, message: 'Error fetching user', error };
    }
  }

  async updateUser(updatedUser: User, userId: string): Promise<any> {
    const { password, name } = updatedUser;
    try {
      if (!password && !name) {
        return { status: 404, message: 'Enter name or password' };
      }

      const result = await this.userModel.updateOne(
        { _id: userId },
        {
          $set: {
            name: name,
            password: password && bcrypt.hashSync(password),
          },
        },
      );

      if (result.modifiedCount === 0) {
        return { status: 404, message: 'User not found' };
      }

      const final = await this.userModel.findById(userId);

      return {
        status: 201,
        message: 'CRUD operation updated successfully',
        updatedUser: final,
      };
    } catch (error) {
      return { status: 500, message: 'Error Updating user', error };
    }
  }

  async deleteUser(userId: string): Promise<any> {
    try {
      const result = await this.userModel.updateOne(
        { _id: userId },
        { delete: true },
      );

      // const final = await this.userModel.findById(userId);

      return { status: 201, message: 'deleted One', deleted: result };
    } catch (error) {
      return { status: 500, message: 'Error Updating user', error };
    }
  }
}
