import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { AppService } from './app.service';
import { CreateProfileDto } from './dto/createProfile.dto';
import { ProfileIdDto } from './dto/profileId.dto';

const exposeId = new SanitizeMongooseModelInterceptor({
  excludeMongooseId: false,
  excludeMongooseV: true,
});

const excludeId = new SanitizeMongooseModelInterceptor({
  excludeMongooseId: true,
  excludeMongooseV: true,
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(excludeId)
  @Post('/profile')
  public async createProfile(@Body() body: CreateProfileDto) {
    return this.appService.createProfile(body);
  }

  @UseInterceptors(exposeId)
  @Get('/profile')
  public async getProfileList() {
    const profiles = await this.appService.getProfileList();
    return profiles;
  }

  @UseInterceptors(excludeId)
  @Get('/profile/:id')
  public async getProfileById(@Param() { id }: ProfileIdDto) {
    return this.appService.getProfileById(id);
  }
}
