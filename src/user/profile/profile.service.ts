import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileCreateDto } from './dto/profileCreate.dto';
import { ProfileUpdateDto } from './dto/profileUpdate.dto';
import { Profile, ProfileDocument } from './schema/profile.schema';
import { PaginateModel } from 'mongoose';

@Injectable()
export class UserProfileService {
  constructor(
    // @InjectConnection() private connection: Connection,
    @InjectModel(Profile.name)
    private profileModel: PaginateModel<ProfileDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async createProfile(profileDto: ProfileCreateDto) {
    const profile = new this.profileModel(profileDto);
    return await profile.save();
  }

  public async updateProfile(_id: string, profileDto: ProfileUpdateDto) {
    return await this.profileModel.updateOne({ _id }, profileDto);
  }

  public async getProfileById(id: string) {
    return await this.profileModel.findById(id);
  }

  public async getProfileList(offset = 0, limit = 3) {
    return await this.profileModel.paginate({}, { offset, limit });
  }

  public async deleteProfileById(_id: string) {
    return await this.profileModel.remove({ _id });
  }
}
