import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicsModule } from './topics/topics.module';
import { RepliesModule } from './replies/replies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SavedTopicsModule } from './saved-topics/saved-topics.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    TopicsModule,
    RepliesModule,
    SavedTopicsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
