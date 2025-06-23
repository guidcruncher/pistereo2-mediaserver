import {
  Logger,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import * as dns from 'node:dns';
import * as os from 'node:os';
import { TransportService } from '../transport.service';
import * as crypto from 'node:crypto';
import { Cron } from '@nestjs/schedule';
const dnssd = require('dnssd');

@Injectable()
export class RegistryClientService
  implements OnModuleInit, BeforeApplicationShutdown
{
  private readonly logger: Logger = new Logger(RegistryClientService.name, {
    timestamp: true,
  });

  private hosts: string[] = [];
  private browser: any = {};

  private async getHostIPAddress() {
    const options = { family: 4 };
    return new Promise<any>((resolve, reject) => {
      dns.lookup(os.hostname(), options, (err, addr) => {
        if (err) {
          reject(err);
        } else {
          resolve(addr);
        }
      });
    });
  }

  public async register(host: string) {
    if (this.hosts.includes(host)) {
      return;
    }

    this.logger.debug(`Discovered ${host} registering.`);
    try {
      let registryUrl = `http://${host}/api/discovery`;
      let transport: TransportService = new TransportService(registryUrl);
      let ipAddress: string = await this.getHostIPAddress();
      let port = process.env.PISTEREO_LISTEN_PORT ?? 3001;
      this.logger.log(
        'Attempting registration with ',
        ipAddress,
        crypto.createHash('sha256').update(os.hostname()).digest('hex'),
      );

      let res = await transport.request(
        'POST',
        '/register',
        {},
        {
          ipAddress: ipAddress,
          apiUrl: `http://${ipAddress}:${port}/api`,
          hostname: os.hostname(),
          id: crypto.createHash('sha256').update(os.hostname()).digest('hex'),
        },
      );
      this.hosts.push(host);
      return res;
    } catch (err) {
      this.logger.error('Error during registration', err);
      return {};
    }
  }

  @Cron('*/15 * * * * *')
  public async heartbeatAll() {
    return await Promise.all(
      this.hosts.map(async (host) => {
        return await this.heartbeat(host);
      }),
    );
  }

  public async heartbeat(host: string) {
    try {
      this.logger.verbose('Heartbeat');
      let registryUrl = `http://${host}/api/discovery`;
      let transport: TransportService = new TransportService(registryUrl);
      let ipAddress: string = await this.getHostIPAddress();
      return await transport.request('GET', '/heartbeat', {
        query: {
          id: crypto.createHash('sha256').update(os.hostname()).digest('hex'),
        },
      });
    } catch (err) {
      this.logger.error('Error during heartbeat', err);
    }
  }

  public async unregister(host: string) {
    try {
      this.logger.log('Unregistering from server');
      let registryUrl = `http://${host}/api/discovery`;
      let transport: TransportService = new TransportService(registryUrl);
      let ipAddress: string = await this.getHostIPAddress();
      return await transport.request('DELETE', '/unregister', {
        query: {
          id: crypto.createHash('sha256').update(os.hostname()).digest('hex'),
        },
      });
    } catch (err) {
      this.logger.error('Error during unregister', err);
    }
  }

  async beforeApplicationShutdown(): Promise<any> {
    this.browser.stop();
    return await Promise.all(
      this.hosts.map(async (host) => {
        return await this.unregister(host);
      }),
    );
  }

  async onModuleInit(): Promise<void> {
    this.browser = new dnssd.Browser(dnssd.tcp('pistereo2'))
      .on('serviceUp', (service) => {
        let host = `${service.addresses[0]}:${service.port}`;
        this.register(host);
      })
      .on('serviceDown', (service) => {
        let host = `${service.hostname}:${service.port}`;
        this.hosts = this.hosts.filter((f) => {
          return f != host;
        });
      })
      .start();

    //   await this.register(process.env.PISTEREO_SERVICE_REGISTRY as string);
  }
}
