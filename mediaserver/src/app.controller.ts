import {
  Logger,
  Query,
  HttpException,
  Body,
  Post,
  Put,
  Get,
  Controller,
} from '@nestjs/common';
import { State, StateService } from './state/state.service';
import { MpvClientService } from './mpv/mpv-client.service';
import { LibrespotClientService } from './librespot/librespot-client.service';
import { MpvPlayerService } from './mpv/mpv-player.service';
import { LibrespotPlayerService } from './librespot/librespot-player.service';
import { AudioService } from './audio.service';
import { AuthToken } from './decorators';

@Controller('/')
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name, {
    timestamp: true,
  });

  constructor(
    private readonly librespotClientService: LibrespotClientService,
    private readonly mpvClientService: MpvClientService,
    private readonly mpvPlayer: MpvPlayerService,
    private readonly librespotPlayer: LibrespotPlayerService,
    private readonly audioService: AudioService,
  ) {}

  @Get('/api/player/stream/metadata')
  async getStreamMetaData(@AuthToken() token: string) {
    let source = await this.getSource(token);
    if (source.source == 'mpv') {
      return await this.mpvPlayer.getMetaData();
    }

    return {};
  }

  @Get('/api/player/source')
  async getSource(@AuthToken() token: string) {
    let librespot: any = await this.librespotPlayer.getStatus();
    let mpv: any = await this.mpvPlayer.getStatus();
    let result: any = { source: '' };

    if (librespot && librespot.device.active && librespot.device.playing) {
      result.source = 'spotify';
    }
    if (mpv && mpv.device.active && mpv.device.playing) {
      result.source = 'mpv';
    }
    return result;
  }

  @Get('/api/player/status')
  async determineActive(@AuthToken() token: string) {
    let librespot: any = await this.librespotPlayer.getStatus();

    if (librespot && librespot.device.playing && librespot.device.active) {
      return librespot;
    }

    let mpv: any = await this.mpvPlayer.getStatus();

    if (mpv && mpv.device.active && mpv.device.playing) {
      return mpv;
    }

    return {};
  }

  @Post('/api/player/metadata')
  async updateMetaData(@AuthToken() token: string, @Body() data: any) {
    let state = StateService.loadState();
    if (!state) {
      state = new State();
    }
    state.track = data;
    StateService.saveState(state);
    return data;
  }

  @Put('/api/player/play')
  async playMedia(@AuthToken() token: string, @Body() data: any) {
    this.logger.verbose('playMedia', JSON.stringify(data));

    let state = StateService.loadState();

    if (!state) {
      state = new State();
    }
    state.track = data;
    StateService.saveState(state);

    if (data.uri.source == 'spotify') {
      return await this.librespotPlayer.play(data.uri.uri);
    } else {
      if (data.url) {
        return await this.mpvPlayer.play(data.url);
      }
    }

    throw new HttpException('Bad request', 400);
  }

  @Put('/api/player/playlist')
  async playPlaylist(@AuthToken() token: string, @Body() data: any) {
    if (!data || !data.tracks) {
      throw new HttpException('Bad request', 400);
    }
    await this.librespotPlayer.stop();
    await this.mpvPlayer.createPlaylist(data.tracks);
  }

  @Put('/api/player/stop')
  async stop(@AuthToken() token: string) {
    let source = (await this.getSource(token)).source;
    if (source == 'mpv') {
      return await this.mpvPlayer.stop();
    }
    if (source == 'spotify') {
      return await this.librespotPlayer.stop();
    }
    return {};
  }

  @Put('/api/player/pause')
  async pause(@AuthToken() token: string) {
    let source = (await this.getSource(token)).source;
    if (source == 'mpv') {
      return await this.mpvPlayer.pause();
    }
    if (source == 'spotify') {
      return await this.librespotPlayer.pause();
    }
    return {};
  }

  @Put('/api/player/toggle')
  async toggle(@AuthToken() token: string) {
    let source = (await this.getSource(token)).source;
    if (source == 'mpv') {
      return await this.mpvPlayer.togglePlayback();
    }
    if (source == 'spotify') {
      return await this.librespotPlayer.togglePlayback();
    }
    return {};
  }

  @Put('/api/player/resume')
  async resume(@AuthToken() token: string) {
    let source = (await this.getSource(token)).source;
    if (source == 'mpv') {
      return await this.mpvPlayer.resume();
    }
    if (source == 'spotify') {
      return await this.librespotPlayer.resume();
    }
    return {};
  }

  @Put('/api/player/previous')
  async previous(@AuthToken() token: string) {
    let source = (await this.getSource(token)).source;
    if (source == 'mpv') {
      return await this.mpvPlayer.previous();
    }
    if (source == 'spotify') {
      return await this.librespotPlayer.previous();
    }
    return {};
  }

  @Put('/api/player/next')
  async next(@AuthToken() token: string, @Body() data: any) {
    if (data.uri) {
      return await this.librespotPlayer.next(data.uri);
    }
    if (data.url) {
      return await this.mpvPlayer.next(data.url);
    }
    throw new HttpException('Bad request', 400);
  }

  @Get('/api/player/volume')
  async getVolume(@AuthToken() token: string) {
    let value = await this.mpvPlayer.getVolume();
    if (value) {
      return { volume: value };
    }
    return { volume: undefined };
  }

  @Put('/api/player/volume')
  async setVolume(@AuthToken() token: string, @Query('volume') volume: number) {
    await this.mpvPlayer.setVolume(volume);
    await this.librespotPlayer.setVolume(volume);
    return {};
  }
}
