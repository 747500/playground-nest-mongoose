import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './profile/profile.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { UserProfileController } from './profile/profile.controller';
import { UserProfileService } from './profile/profile.service';

@Module({
  imports: [
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
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserModule {}
