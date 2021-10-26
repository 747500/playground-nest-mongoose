import { Alphabet, ValidationSchema } from 'fastest-validator-nestjs';

@ValidationSchema({ strict: true })
export class ProfileNameDto {
  @Alphabet()
  first: string;

  @Alphabet()
  middle: string;

  @Alphabet()
  last: string;
}
