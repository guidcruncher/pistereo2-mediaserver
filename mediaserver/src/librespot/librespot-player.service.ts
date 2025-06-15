import { OnModuleInit, HttpException, Injectable } from '@nestjs/common';
import { TransportService } from '../transport.service';
import { State, StateService } from '../state/state.service';

@Injectable()
export class LibrespotPlayerService implements OnModuleInit {
  onModuleInit() {
    let state = StateService.loadState();
    if (state) {
      this.setVolume(state.volumeLibRespot);
    }
  }

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

    const result = await this.transport.request(
      'POST',
      '/player/play',
      {},
      request,
    );

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
      return await this.transport.request(
        'POST',
        '/player/next',
        {},
        { uri: uri },
      );
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
      let state = StateService.loadState() ?? new State();
      state.volumeLibRespot = parseInt(volume.toString());
      StateService.saveState(state);
    } catch (err) {}

    return await this.transport.request(
      'POST',
      '/player/volume',
      {},
      { volume: parseInt(volume.toString()), relative: false },
    );
  }
}
