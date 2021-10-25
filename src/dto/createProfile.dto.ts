import {
  Alphabet,
  Date,
  Email,
  NestedObject,
  ValidationSchema,
} from 'fastest-validator-nestjs';

@ValidationSchema({ strict: true })
export class ProfileNameDto {
  @Alphabet()
  first: string;

  @Alphabet()
  middle: string;

  @Alphabet()
  last: string;
}

@ValidationSchema({ strict: true })
export class CreateProfileDto {
  @NestedObject()
  name: ProfileNameDto;

  @Date({ convert: true })
  birthday: Date;

  @Email()
  email: string;
}
