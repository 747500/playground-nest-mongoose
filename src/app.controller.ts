import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { AppService } from './app.service';
import { ProfileCreateDto } from './dto/profileCreate.dto';
import { ProfileIdDto } from './dto/profileId.dto';
import { ProfileUpdateDto } from './dto/profileUpdate.dto';

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
  public async createProfile(@Body() body: ProfileCreateDto) {
    return this.appService.createProfile(body);
  }

  @UseInterceptors(excludeId)
  @Put('/profile/:id')
  public async updateProfile(
    @Param() { id }: ProfileIdDto,
    @Body() body: ProfileUpdateDto,
  ) {
    const result = await this.appService.updateProfile(id, body);

    if (0 === result.matchedCount) {
      throw new HttpException('Object was not found', HttpStatus.NOT_FOUND);
    }

    return this.appService.getProfileById(id);
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
