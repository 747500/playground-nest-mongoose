import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

export class ProfileName {
  first: string;
  middle: string;
  last: string;
}

@Schema()
export class Profile {
  @Prop(
    raw({
      first: String,
      middle: String,
      last: String,
    }),
  )
  name: ProfileName;

  @Prop()
  birthday: Date;

  @Prop()
  email: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
