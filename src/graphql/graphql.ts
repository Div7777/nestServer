
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddUserArgs {
    id: string;
    name: string;
    email: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role?: Nullable<string>;
}

export interface IQuery {
    index(): string | Promise<string>;
    Users(): User[] | Promise<User[]>;
    findUserById(userId: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    deleteUser(userId: string): string | Promise<string>;
    addUser(addUsers: AddUserArgs): string | Promise<string>;
    updateUser(updateUsers: AddUserArgs, userId: string): string | Promise<string>;
}

type Nullable<T> = T | null;
