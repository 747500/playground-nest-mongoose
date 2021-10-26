import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schema/profile.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeatureAsync([
      {
        name: Profile.name,
        useFactory: () => {
          ProfileSchema.plugin(mongoosePaginate);
          return ProfileSchema;
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
