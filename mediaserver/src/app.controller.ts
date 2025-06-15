import { Get, Controller, MessageEvent, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';

import { MpvClientService } from './mpv/mpv-client.service';
import { LibrespotClientService } from './librespot/librespot-client.service';
import { MpvPlayerService } from './mpv/mpv-player.service';
import { LibrespotPlayerService } from './librespot/librespot-player.service';

@Controller('/')
export class AppController {
  constructor(
    private readonly librespotClientService: LibrespotClientService,
    private readonly mpvClientService: MpvClientService,
    private readonly mpvPlayer: MpvPlayerService,
    private readonly librespotPlayer: LibrespotPlayerService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get('/api/status')
  async determineActive() {
    let librespot: any = await this.librespotPlayer.getStatus();
    let mpv: any = await this.mpvPlayer.getStatus();
    let result: any = { source: '', state: {} };

    if (librespot && !librespot.stopped) {
      result.state = librespot;
      result.source = 'spotify';
    }

    if ((mpv && mpv.active) || mpv.playing) {
      result.state = mpv;
      result.source = 'mpv';
    }

    return result;
  }

  @Sse('/sse/player')
  async ssePlayer(payload: any): Promise<Observable<MessageEvent>> {
    return fromEvent(this.eventEmitter, 'player').pipe(
      map((payload) => ({
        data: JSON.stringify(payload),
      })),
    );
  }
}
