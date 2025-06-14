import { Module } from '@nestjs/common';
import { LibrespotPlayerService } from './librespot-player.service';
import { LibrespotController } from './librespot.controller';

@Module({
  providers: [LibrespotPlayerService],
  controllers: [LibrespotController],
})
export class LibrespotModule {}
