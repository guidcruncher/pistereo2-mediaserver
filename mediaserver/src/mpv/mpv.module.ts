import { Module } from '@nestjs/common';
import { MpvPlayerService } from './mpv-player.service';
import { MpvController } from './mpv.controller';

@Module({
  providers: [MpvPlayerService],
  controllers: [MpvController],
})
export class MpvModule {}
