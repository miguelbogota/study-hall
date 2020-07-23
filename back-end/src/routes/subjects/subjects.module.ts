import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectSchema } from './models/subject.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subject', schema: SubjectSchema }
    ])
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService]
})
export class SubjectsModule {}
