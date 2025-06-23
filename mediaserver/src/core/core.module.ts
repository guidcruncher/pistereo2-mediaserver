import { Module } from '@nestjs/common';
import { MixerService } from './mixer.service';
import { MixerController } from './mixer.controller';

@Module({
  providers: [MixerService],
  controllers: [MixerController],
})
export class CoreModule {}
