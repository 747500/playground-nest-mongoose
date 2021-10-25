import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

export class ProfileName {
  first: string;
  middle: string;
  last: string;
}

@Schema({ timestamps: true })
export class Profile {
  /*@Prop(
    raw({
      first: String,
      middle: String,
      last: String,
    }),
  )*/
  @Prop()
  name: ProfileName;

  @Prop()
  birthday: Date;

  @Prop()
  email: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
