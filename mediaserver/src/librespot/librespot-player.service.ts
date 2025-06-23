import {
  Logger,
  OnModuleInit,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { TransportService } from '../transport.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { State, StateService } from '../state/state.service';
import {
  LibrespotStatusMapper,
  PlayableItemMapper,
  PlaybackQueueMapper,
} from '../data/mappers/index';
import {
  DeviceProp,
  Uri,
  PlayableItem,
  PlaybackQueue,
  PlayerStatus,
} from '../data/views/index';
import { LibrespotAuthService } from './librespot-auth.service';

@Injectable()
export class LibrespotPlayerService implements OnModuleInit {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly authService: LibrespotAuthService,
  ) {}

  private readonly logger: Logger = new Logger(LibrespotPlayerService.name, {
    timestamp: true,
  });

  onModuleInit() {
    let state = StateService.loadState();
    if (state) {
      if (state.volumeLibRespot) {
        this.setVolume(state.volumeLibRespot);
      }
    }
  }

  private readonly transport: TransportService = new TransportService(
    'http://127.0.0.1:3678',
  );

  async getStatus() {
    const result = await this.transport.request('GET', '/status');
    let state = new PlayerStatus();

    state = LibrespotStatusMapper(result.value);

    return state;
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

    this.eventEmitter.emit('player', {
      type: 'stateChanged',
      paused: false,
      source: 'spotify',
    });

    return await this.getStatus();
  }

  async togglePlayback() {
    let state = await this.getStatus();

    if (state && state.device) {
      if (state.device.playing) {
        await this.pause();
      } else {
        await this.resume();
      }
    }

    return state;
  }

  async pause() {
    try {
      let state = await this.transport.request('POST', '/player/pause');
      this.eventEmitter.emit('player', {
        type: 'stateChanged',
        paused: true,
        source: 'spotify',
      });
      return state;
    } catch (err) {
      return {};
    }
  }

  async stop() {
    try {
      let res = await this.transport.request('POST', '/player/pause');
      let state = StateService.loadState() ?? new State();
      state.track = {};
      StateService.saveState(state);

      this.eventEmitter.emit('player', {
        type: 'stopped',
        source: 'mpv',
      });
      this.eventEmitter.emit('player', {
        type: 'stateChanged',
        paused: true,
        source: 'spotify',
      });
      return res;
    } catch (err) {
      return {};
    }
  }

  async resume() {
    try {
      let state = await this.transport.request('POST', '/player/resume');
      this.eventEmitter.emit('player', {
        type: 'stateChanged',
        paused: false,
        source: 'spotify',
      });
      return state;
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

  async spotifyNext(token: string) {
    let conn = new TransportService('https://api.spotify.com');
    let result = await conn.request(
      'POST',
      '/v1/me/player/next',
      { Authorization: `Bearer ${token}` },
      {},
    );
    return result;
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

    let res = await this.transport.request(
      'POST',
      '/player/volume',
      {},
      { volume: parseInt(volume.toString()), relative: false },
    );

    this.eventEmitter.emit('player', {
      type: 'volumeChanged',
      volume: volume,
      source: 'spotify',
    });

    return res;
  }
}
