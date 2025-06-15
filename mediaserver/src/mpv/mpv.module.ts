import { Module } from '@nestjs/common';
import { MpvPlayerService } from './mpv-player.service';
import { MpvController } from './mpv.controller';
import { MpvClientService } from './mpv-client.service';

@Module({
  providers: [MpvPlayerService, MpvClientService],
  controllers: [MpvController],
  exports: [MpvPlayerService, MpvClientService],
})
export class MpvModule {}
