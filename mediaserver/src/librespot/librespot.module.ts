import { Module } from '@nestjs/common';
import { LibrespotPlayerService } from './librespot-player.service';
import { LibrespotController } from './librespot.controller';
import { LibrespotClientService } from './librespot-client.service';
import { LibrespotAuthService } from './librespot-auth.service';

@Module({
  providers: [
    LibrespotPlayerService,
    LibrespotClientService,
    LibrespotAuthService,
  ],
  controllers: [LibrespotController],
  exports: [LibrespotPlayerService, LibrespotClientService],
})
export class LibrespotModule {}
