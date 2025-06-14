import { Module } from '@nestjs/common';
import { MpvPlayerService } from './mpv-player.service';

@Module({
  providers: [MpvPlayerService],
})
export class MpvModule {}
