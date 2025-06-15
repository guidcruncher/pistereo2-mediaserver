import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WebSocket } from 'ws';

@Injectable()
export class LibrespotClientService implements OnModuleDestroy {
  private socket: WebSocket;

  constructor(private readonly eventEmitter: EventEmitter2) {
    this.open('ws://127.0.0.1:3678/events');
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
    this.socket.dlose();
  }

  private async onMessage(namespace: string, payload: any) {
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
        this.eventEmitter.emit('player', {
          type: 'active',
          active: true,
          source: 'spotify',
        });
        break;
      case 'metadata':
        const mapped = payload.data;
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
          source: 'spotify',
        });
        break;
      case 'not_playing':
      case 'stopped':
      case 'seek':
      case 'volume':
      case 'shuffle_context':
      case 'repeat_context':
      case 'repeat_track':
        break;
    }
  }
}
