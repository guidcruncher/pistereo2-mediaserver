import { Module } from '@nestjs/common';
import { RegistryClientService } from './registry-client.service';
import { RegistryShutdownService } from './registry-shutdown.service';

@Module({
  providers: [RegistryClientService, RegistryShutdownService],
})
export class RegistryModule {}
