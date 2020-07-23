import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// Modulos de las rutas
import { UsersModule } from './routes/users/users.module';
import { SubjectsModule } from './routes/subjects/subjects.module';
import { GroupsModule } from './routes/groups/groups.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/study-hall', { useNewUrlParser: true, useFindAndModify: true }),
    UsersModule,
    SubjectsModule,
    GroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
