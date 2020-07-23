import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
// Modulos de las rutas
import { UsersModule } from './routes/users/users.module';
import { SubjectsModule } from './routes/subjects/subjects.module';
import { GroupsModule } from './routes/groups/groups.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/study-hall', { useNewUrlParser: true, useFindAndModify: true }),
    AuthModule,
    UsersModule,
    SubjectsModule,
    GroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
