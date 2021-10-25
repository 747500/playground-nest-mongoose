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
import { ProfileIdParam } from './profileId.param';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/profile')
  public async createProfile(@Body() body: CreateProfileDto) {
    return this.appService.createProfile(body);
  }

  @Get('/profile')
  public async getProfileList() {
    const profiles = await this.appService.getProfileList();
    return profiles;
  }

  @Get('/profile/:id')
  public async getProfileById(@Param() { id }: ProfileIdParam) {
    return this.appService.getProfileById(id);
  }
}
