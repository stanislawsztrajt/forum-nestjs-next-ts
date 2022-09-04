import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { HashPassword } from './middlewares/hash-password.middleware';
import { SetCreatedAtMiddleware } from 'src/middlewares/set-created-at-date.middleware';
import { JwtService } from '@nestjs/jwt';
import { SetDefaultRoleMiddleware } from './middlewares/set-default-role.middleware';
import { SetUpdatedAtMiddleware } from 'src/middlewares/set-updated-at-date.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetCreatedAtMiddleware, SetDefaultRoleMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST })

      .apply(HashPassword, SetUpdatedAtMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.PATCH },
      );
  }
}
