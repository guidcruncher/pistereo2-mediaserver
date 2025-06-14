import { Get, Put, Post, Query, Controller } from '@nestjs/common';
import { LibrespotPlayerService } from './librespot-player.service';

@Controller('/api/spotify')
export class LibrespotController {
  constructor(private readonly player: LibrespotPlayerService) {}

  @Get('status')
  async getStatus() {
    return await this.player.getStatus();
  }

  @Get('play')
  async play(@Query('uri') uri: string) {
    return await this.player.play(uri);
  }

  @Put('stop')
  async stop() {
    return await this.player.stop();
  }

  @Put('pause')
  async pause() {
    return await this.player.pause();
  }

  @Put('resume')
  async resume() {
    return await this.player.getStatus();
  }

  @Put('previous')
  async previous() {
    return await this.player.previous();
  }

  @Put('next')
  async next(@Query('uri') uri: string) {
    return await this.player.next(uri);
  }

  @Get('volume')
  async getVolume() {
    return await this.player.getVolume();
  }

  @Put('volume')
  async setVolume(@Query('volume') volume: number) {
    return await this.player.setVolume(volume);
  }
}
