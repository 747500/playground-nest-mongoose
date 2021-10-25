import {
  Date,
  Email,
  NestedObject,
  ValidationSchema,
} from 'fastest-validator-nestjs';
import { ProfileNameDto } from './profileName.dto';

@ValidationSchema({ strict: true })
export class ProfileCreateDto {
  @NestedObject()
  name: ProfileNameDto;

  @Date({ convert: true })
  birthday: Date;

  @Email()
  email: string;
}
