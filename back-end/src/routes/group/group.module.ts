import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './models/group.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService]
})
export class GroupModule {}
