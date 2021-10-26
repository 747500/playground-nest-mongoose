import { ObjectId, ValidationSchema } from 'fastest-validator-nestjs';

@ValidationSchema({ strict: true })
export class ProfileIdDto {
  @ObjectId({ optional: true })
  id: string;
}
