import { State, StateService } from '../state/state.service';
import { Logger, Injectable, OnModuleDestroy } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WebSocket } from 'ws';
import { MpvPlayerService } from '../mpv/mpv-player.service';
import { LibrespotMetadataMapper } from '../data/mappers/librespotmetadata-mapper';
import { LibrespotAuthService } from './librespot-auth.service';

@Injectable()
export class LibrespotClientService implements OnModuleDestroy {
  private socket: WebSocket;
  private readonly logger: Logger = new Logger(LibrespotClientService.name, {
    timestamp: true,
  });

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly authService: LibrespotAuthService,
  ) {
    this.open('ws://127.0.0.1:3678/events');
  }

  private async stopStream() {
    let mpv = new MpvPlayerService(this.eventEmitter);
    return await mpv.stop();
  }

  public open(path: string) {
    this.socket = new WebSocket(path);

    this.socket.on('error', async (error) => {});

    this.socket.on('connect', () => {});

    this.socket.on('message', async (data) => {
      try {
        const json: any = JSON.parse(data.toString());
        await this.onMessage('spotify', json);
      } catch (err) {}
    });
  }

  public onModuleDestroy() {
    this.socket.close();
  }

  private async setVolume(value: number) {
    let mpv = new MpvPlayerService(this.eventEmitter);
    await mpv.setVolume(value);
    let state: State = StateService.loadState();
    if (!state) {
      state = new State();
    }
    state.volumeLibRespot = value;
    state.volumeMpv = value;
    StateService.saveState(state);
  }

  private async onMessage(namespace: string, payload: any) {
    this.logger.verbose('LibrespotMessage', JSON.stringify(payload));

    switch (payload.type) {
      case 'paused':
        this.eventEmitter.emit('player', {
          type: 'stateChanged',
          paused: true,
          source: 'spotify',
        });
        break;
      case 'playing':
        this.eventEmitter.emit('player', {
          type: 'stateChanged',
          paused: false,
          source: 'spotify',
        });
        break;
      case 'will_play':
      case 'active':
        this.stopStream();
        this.eventEmitter.emit('player', {
          type: 'active',
          active: true,
          source: 'spotify',
        });
        break;
      case 'metadata':
        const mapped = LibrespotMetadataMapper(payload.data);
        let state = StateService.loadState();
        if (!state) {
          state = new State();
        }
        if (state.track && state.track.uri) {
          if (state.track.uri.uri != mapped.uri.uri) {
            this.eventEmitter.emit('player', {
              type: 'metadataRequest',
              uri: mapped.uri,
              source: 'spotify',
            });
          }
        }
        state.track = mapped;
        StateService.saveState(state);
        this.eventEmitter.emit('player', {
          type: 'trackChanged',
          track: mapped,
          source: 'spotify',
        });
        break;
      case 'inactive':
        this.eventEmitter.emit('player', {
          type: 'active',
          active: false,
          souxrce: 'spotify',
        });
        break;
      case 'not_playing':
      case 'stopped':
        this.eventEmitter.emit('player', {
          type: 'stopped',
          stopped: true,
          source: 'spotify',
        });
      case 'volume':
        await this.setVolume(payload.data.value);
        break;
      case 'seek':
      case 'shuffle_context':
      case 'repeat_context':
      case 'repeat_track':
        break;
    }
  }
}
