import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { RegistryClientService } from './registry-client.service';

@Injectable()
export class RegistryShutdownService implements OnApplicationShutdown {
  constructor(private readonly registryClientService: RegistryClientService) {}

  onApplicationShutdown(signal: string) {
    this.registryClientService.unregister().then(() => {
    });
  }
}
