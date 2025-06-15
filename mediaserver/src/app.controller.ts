import {
  Query,
  HttpException,
  Body,
  Post,
  Put,
  Get,
  Controller,
  MessageEvent,
  Sse,
} from '@nestjs/common';
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

  @Get('/api/player/source')
  async getSource() {
    let librespot: any = await this.librespotPlayer.getStatus();
    let mpv: any = await this.mpvPlayer.getStatus();
    let result: any = { source: '' };
    if (librespot && !librespot.stopped) {
      result.source = 'spotify';
    }
    if ((mpv && mpv.active) || mpv.playing) {
      result.source = 'mpv';
    }
    return result;
  }

  @Get('/api/player/status')
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

  @Put('/api/player/play')
  async playMedia(@Body() data: any) {
    if (data.uri) {
      return await this.librespotPlayer.play(data.uri);
    }

    if (data.url) {
      return await this.mpvPlayer.play(data.url);
    }

    throw new HttpException('Bad request', 400);
  }

  @Put('/api/player/stop')
  async stop() {
    let source = (await this.getSource()).source;
    if (source == 'mpv') {
      return await this.mpvPlayer.stop();
    }
    if (source == 'spotify') {
      return await this.librespotPlayer.stop();
    }
    return {};
  }

  @Put('/api/player/pause')
  async pause() {
    let source = (await this.getSource()).source;
    if (source == 'mpv') {
      return await this.mpvPlayer.pause();
    }
    if (source == 'spotify') {
      return await this.librespotPlayer.pause();
    }
    return {};
  }

  @Put('/api/player/resume')
  async resume() {
    let source = (await this.getSource()).source;
    if (source == 'mpv') {
      return await this.mpvPlayer.resume();
    }
    if (source == 'spotify') {
      return await this.librespotPlayer.resume();
    }
    return {};
  }

  @Put('/api/player/previous')
  async previous() {
    let source = (await this.getSource()).source;
    if (source == 'mpv') {
      return await this.mpvPlayer.previous();
    }
    if (source == 'spotify') {
      return await this.librespotPlayer.previous();
    }
    return {};
  }

  @Put('/api/player/next')
  async next(@Body() data: any) {
    if (data.uri) {
      return await this.librespotPlayer.next(data.uri);
    }
    if (data.url) {
      return await this.mpvPlayer.next(data.url);
    }
    throw new HttpException('Bad request', 400);
  }

  @Get('/api/player/volume')
  async getVolume() {
    let value = await this.mpvPlayer.getVolume();
    if (value) {return {volume: value}}
    return {volume: undefined}
  }

  @Put('/api/player/volume')
  async setVolume(@Query('volume') volume: number) {
    await this.mpvPlayer.setVolume(volume);
    await this.librespotPlayer.setVolume(volume);
    return {};
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
