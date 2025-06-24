import {
  Injectable,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Controller,
} from '@nestjs/common';
import { MixerService } from './mixer.service';
import { Mixer, Channel, Frequency } from './equaliser';

@Injectable()
@Controller('/')
export class MixerController {
  constructor(private readonly mixerService: MixerService) {}

  @Get('/api/mixer/:device')
  async getMixer(@Param('device') device: string) {
    return await this.mixerService.getMixer(device);
  }

  @Put('/api/mixer/:device/reset')
  async resetMixer(@Param('device') device: string) {
    const mixer = await this.mixerService.resetMixer(
      device,
      parseInt((process.env.PISTEREO_EQ_RESET ?? 60) as string),
    );
    return mixer;
  }

  @Put('/api/mixer/:device')
  async updateMixer(@Param('device') device: string, @Body() mixer: Mixer) {
    return await this.mixerService.updateMixer(device, mixer);
  }

  @Put('/api/mixer/:device/channel/:index')
  async updateMixerChannel(
    @Param('device') device: string,
    @Param('index') index: number,
    @Body() item: Frequency,
  ) {
    let mixer = await this.mixerService.getMixer(device);
    mixer.frequencies[item.numid-1] = item;
    return await this.mixerService.updateMixer(device, mixer);
  }
}
