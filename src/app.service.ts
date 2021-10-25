import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileCreateDto } from './dto/profileCreate.dto';
import { ProfileUpdateDto } from './dto/profileUpdate.dto';
import { Profile, ProfileDocument } from './schema/profile.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
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

  public async getProfileList() {
    return this.profileModel.find().exec();
  }
}
