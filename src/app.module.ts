import { Module } from '@nestjs/common';
import { NinjasModule } from './ninjas/ninjas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { userModule } from './graphql/user.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    NinjasModule,
    UserModule,
    userModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
