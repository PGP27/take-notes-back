import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List, ListSchema } from './list.entity';
import { User, UserSchema } from '../user/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: List.name, schema: ListSchema }, { name: User.name, schema: UserSchema }])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
