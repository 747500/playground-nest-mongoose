import { ObjectId } from 'fastest-validator-nestjs';

export class ProfileIdDto {
  @ObjectId()
  id: string;
}
