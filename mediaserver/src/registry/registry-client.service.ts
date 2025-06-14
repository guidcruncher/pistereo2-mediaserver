import {
  Injectable,
  OnModuleInit,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import * as dns from 'node:dns';
import * as os from 'node:os';
import { TransportService } from '../transport.service';
import * as crypto from 'node:crypto';

@Injectable()
export class RegistryClientService implements OnModuleInit {
  private async getHostIPAddress() {
    const options = { family: 4 };
    return new Promise<any>((resolve, reject) => {
      dns.lookup(os.hostname(), options, (err, addr) => {
        if (err) {
          reject(err);
          console.error(err);
        } else {
          resolve(addr);
        }
      });
    });
  }

  public async register() {
    try {
      let registryUrl = process.env.PISTEREO_SERVICE_REGISTRY as string;
      let transport: TransportService = new TransportService(registryUrl);
      let ipAddress: string = await this.getHostIPAddress();

      return await transport.request('POST', '/register', {
        body: {
          ipAddress: ipAddress,
          apiUrl: `http://${ipAddress}/api`,
          hostname: os.hostname(),
          id: crypto.createHash('sha256').update(os.hostname()).digest('hex'),
        },
      });
    } catch (err) {
      return {};
    }
  }

  public async heartbeat() {
    try {
      let registryUrl = process.env.PISTEREO_SERVICE_REGISTRY as string;
      let transport: TransportService = new TransportService(registryUrl);
      let ipAddress: string = await this.getHostIPAddress();
      return await transport.request('GET', '/heartbeat', {
        query: {
          id: crypto.createHash('sha256').update(os.hostname()).digest('hex'),
        },
      });
    } catch (err) {}
  }

  public async unregister() {
    try {
      let registryUrl = process.env.PISTEREO_SERVICE_REGISTRY as string;
      let transport: TransportService = new TransportService(registryUrl);
      let ipAddress: string = await this.getHostIPAddress();
      return await transport.request('DELETE', '/heartbeat', {
        query: {
          id: crypto.createHash('sha256').update(os.hostname()).digest('hex'),
        },
      });
    } catch (err) {}
  }

  async onModuleInit(): Promise<void> {
    await this.register();
  }
}
