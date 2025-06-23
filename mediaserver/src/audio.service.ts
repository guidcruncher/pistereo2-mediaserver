import { Injectable } from '@nestjs/common';
import { LibrespotPlayerService } from './librespot/librespot-player.service';
import { MpvPlayerService } from './mpv/mpv-player.service';
import { PlayerStatus } from './data/views/playerstatus';

@Injectable()
export class AudioService {
  constructor(
    private readonly spotifyPlayer: LibrespotPlayerService,
    private readonly mpvPlayer: MpvPlayerService,
  ) {}

  async determineStatus(token: string, user: any) {
    let status: any = new PlayerStatus();

    try {
      status = await this.spotifyPlayer.getStatus();
      if (status.device.active && status.device.playing) {
        return status;
      }
    } catch (err) {}
    status = await this.mpvPlayer.getStatus();
    return status;
  }
}
