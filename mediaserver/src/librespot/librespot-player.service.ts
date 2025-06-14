import { HttpException, Injectable } from '@nestjs/common';
import { TransportService } from '../transport.service';

@Injectable()
export class LibrespotPlayerService {
  private readonly transport: TransportService = new TransportService(
    'http://127.0.0.1:3678',
  );

  async getStatus() {
    const result = await this.transport.request('GET', '/status');
    return result.value;
  }

  async play(uri: string) {
    let request: any = {} as any;
    request = { uri: uri, paused: false };

    const result = await this.transport.request('POST', '/player/play', {
      body: request,
    });

    if (result.status == 204) {
      return result;
    }

    throw new HttpException('Playback error', result.status);
  }

  async pause() {
    try {
      return await this.transport.request('POST', '/player/pause');
    } catch (err) {
      return {};
    }
  }

  async stop() {
    try {
      return await this.transport.request('POST', '/player/pause');
    } catch (err) {
      return {};
    }
  }

  async resume() {
    try {
      return await this.transport.request('POST', '/player/resume');
    } catch (err) {
      return {};
    }
  }

  async previous() {
    try {
      return await this.transport.request('POST', '/player/prev');
    } catch (err) {
      return {};
    }
  }

  async next(uri: string) {
    try {
      return await this.transport.request('POST', '/player/next', {
        body: { uri: uri },
      });
    } catch (err) {
      return {};
    }
  }

  async getVolume() {
    try {
      return await this.transport.request('GET', '/player/volume');
    } catch (err) {
      return {};
    }
  }

  async setVolume(volume: number) {
    try {
      return await this.transport.request('POST', '/player/volume', {
        body: { volume: volume, relative: false },
      });
    } catch (err) {
      return {};
    }
  }
}
