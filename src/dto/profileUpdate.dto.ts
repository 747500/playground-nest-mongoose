import {
  Date,
  Email,
  NestedObject,
  ValidationSchema,
} from 'fastest-validator-nestjs';
import { ProfileNameDto } from './profileName.dto';

@ValidationSchema({ strict: true })
export class ProfileUpdateDto {
  // mongo update logic: whole object or not include to update
  @NestedObject({ optional: true })
  name: ProfileNameDto;

  @Date({ convert: true, optional: true })
  birthday: Date;

  @Email({ optional: true })
  email: string;
}
