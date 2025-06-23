import { Get, Put, Post, Query, Controller } from '@nestjs/common';
import { MpvPlayerService } from './mpv-player.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('/api/stream')
export class MpvController {
  constructor(private readonly player: MpvPlayerService) {}

  @Get('status')
  async getStatus() {
    return await this.player.getStatus();
  }

  @Get('play')
  async play(@Query('url') url: string) {
    return await this.player.play(url);
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
    return await this.player.resume();
  }

  @Put('previous')
  async previous() {
    return await this.player.previous();
  }

  @Put('next')
  async next(@Query('url') url: string) {
    return await this.player.next(url);
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
