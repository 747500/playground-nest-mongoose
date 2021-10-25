import { ObjectId } from 'fastest-validator-nestjs';

export class ProfileIdParam {
  @ObjectId()
  id: string;
}
