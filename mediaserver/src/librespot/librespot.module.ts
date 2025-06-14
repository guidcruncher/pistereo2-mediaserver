import { Module } from '@nestjs/common';
import { LibrespotPlayerService } from './librespot-player.service';

@Module({
  providers: [LibrespotPlayerService],
})
export class LibrespotModule {}
