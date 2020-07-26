import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './routes/user/user.module';
import { SubjectModule } from './routes/subject/subject.module';
import { GroupModule } from './routes/group/group.module';
import { ChatModule } from './routes/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI')
      })
    }),
    AuthModule,
    UserModule,
    SubjectModule,
    GroupModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
