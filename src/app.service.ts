import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/createProfile.dto';
import { Profile, ProfileDocument } from './schema/profile.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async createProfile(profileDto: CreateProfileDto) {
    const profile = new this.profileModel(profileDto);
    return await profile.save();
  }

  public async getProfileById(id: string) {
    return await this.profileModel.findById(id);
  }

  public async getProfileList() {
    return this.profileModel.find().exec();
  }
}
