import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './user.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UserService } from './user.service';
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.graphql'), //it is used for generate schema
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.ts'), //defination is used for interface
      },
    }),
  ],
  providers: [UserResolver, UserService],
})
export class userModule {}
