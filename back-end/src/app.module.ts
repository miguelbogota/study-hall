import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/users/users.module';
import { SubjectsModule } from './routes/subjects/subjects.module';
import { GroupsModule } from './routes/groups/groups.module';

@Module({
  imports: [
    UsersModule,
    SubjectsModule,
    GroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
