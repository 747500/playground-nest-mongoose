import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { ProfileCreateDto } from './dto/profileCreate.dto';
import { ProfileIdDto } from './dto/profileId.dto';
import { ProfileUpdateDto } from './dto/profileUpdate.dto';
import { UserProfileService } from './profile.service';

// const exposeId = new SanitizeMongooseModelInterceptor({
//   excludeMongooseId: false,
//   excludeMongooseV: true,
// });

const excludeId = new SanitizeMongooseModelInterceptor({
  excludeMongooseId: true,
  excludeMongooseV: true,
});

@Controller()
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseInterceptors(excludeId)
  @Post('/profile')
  public async createProfile(@Body() body: ProfileCreateDto) {
    return this.userProfileService.createProfile(body);
  }

  @UseInterceptors(excludeId)
  @Put('/profile/:id')
  public async updateProfile(
    @Param() { id }: ProfileIdDto,
    @Body() body: ProfileUpdateDto,
  ) {
    const { matchedCount } = await this.userProfileService.updateProfile(
      id,
      body,
    );

    if (0 === matchedCount) {
      throw new HttpException('Object was not found', HttpStatus.NOT_FOUND);
    }

    return this.userProfileService.getProfileById(id);
  }

  //@UseInterceptors(exposeId)
  @Get('/profile')
  public async getProfileList() {
    return await this.userProfileService.getProfileList(0, 3);
  }

  @UseInterceptors(excludeId)
  @Get('/profile/:id')
  public async getProfileById(@Param() { id }: ProfileIdDto) {
    return this.userProfileService.getProfileById(id);
  }

  @Delete('/profile/:id')
  public async deleteProfileById(@Param() { id }: ProfileIdDto) {
    const { deletedCount } = await this.userProfileService.deleteProfileById(
      id,
    );

    if (0 === deletedCount) {
      throw new HttpException('Object was not found', HttpStatus.NOT_FOUND);
    }

    return { delete: 'Ok' };
  }
}
