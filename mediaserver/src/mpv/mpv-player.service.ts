import {
  Logger,
  OnModuleInit,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as net from 'net';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as util from 'util';
import { State, StateService } from '../state/state.service';
import { LibrespotPlayerService } from '../librespot/librespot-player.service';
import { MpvStatusMapper } from '../data/mappers/mpvstatus-mapper';
import { LibrespotAuthService } from '../librespot/librespot-auth.service';
const execFile = util.promisify(require('node:child_process').execFile);

const errorCodes: Record<string, number> = {
  success: 200,
  'property not found': 404,
  'property unavailable': 400,
};

@Injectable()
export class MpvPlayerService implements OnModuleInit {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  private readonly logger: Logger = new Logger(MpvPlayerService.name, {
    timestamp: true,
  });

  onModuleInit() {
    let state = StateService.loadState();
    if (state) {
      if (state.volumeMpv) {
        this.setVolume(state.volumeMpv);
      }
    }
  }

  private async stopStream() {
    let mpv = new LibrespotPlayerService(
      this.eventEmitter,
      new LibrespotAuthService(),
    );
    return await mpv.stop();
  }

  private async sendCommand(cmd: string, parameters: any[] = []): Promise<any> {
    let commandText: any[] = [cmd];
    commandText = commandText.concat(parameters);
    const jsonCmd: string = JSON.stringify({ command: commandText });
    const socket: string = (process.env.PISTEREO_MPV_SOCKET as string) ?? '';
    const cmdArgs: string[] = ['-c', `echo '${jsonCmd}' | socat - ${socket}`];

    this.logger.debug('MPV Command', jsonCmd);
    return new Promise((resolve, reject) => {
      try {
        if (cmd == 'get_property' && parameters.length > 0) {
          if (parameters[0] == '') {
            reject();
            return;
          }
        }

        execFile('sh', cmdArgs)
          .then((result) => {
            try {
              const json: any = JSON.parse(result.stdout);
              if (json.error) {
                if (json.error != 'success') {
                  json.statusCode = errorCodes[json.error] ?? 500;
                  json.command = jsonCmd;
                  resolve(json);
                } else {
                  json.statusCode = errorCodes[json.error] ?? 500;
                  json.command = jsonCmd;
                  resolve(json);
                }
              } else {
                resolve(json);
              }
            } catch (err) {
              this.logger.error('Error in MPV Command ' + jsonCmd, err);
              resolve({
                statusCode: 500,
                command: jsonCmd,
              });
            }
          })
          .catch((err) => {
            this.logger.error('Error in MPV Command ' + jsonCmd, err);
            resolve({ statusCode: 500, command: jsonCmd });
            //reject(err)
          });
      } catch (err) {
        this.logger.error('Error in MPV Command ', err);
        reject(err);
      }
    });
  }

  async togglePlayback() {
    await this.sendCommand('cycle', ['pause']);
    const prop = await this.sendCommand('get_property', ['pause']);
    if (!prop) {
      return false;
    }
    const playing = !prop.data;

    return !prop.data;
  }

  async clearPlaylist() {
    await this.sendCommand('playlist-clear', []);
    await this.sendCommand('playlist-remove', ['0']);
  }

  async createPlaylist(tracks: string[]) {
    const pathProp = await this.sendCommand('get_property', ['path']);
    let playlist: string[] = tracks;
    if (pathProp && pathProp.status == 200) {
      playlist.push(pathProp.data);
    }
    await this.clearPlaylist();

    for (var i = 0; i < playlist.length; i++) {
      if (i == 0) {
        await this.stopStream();
        await this.sendCommand('loadfile', [playlist[i], 'replace']);
      } else {
        await this.sendCommand('loadfile', [playlist[i], 'append']);
      }
    }

    playlist.push;
  }

  async getMetaData() {
    const idleProp = await this.sendCommand('get_property', ['core-idle']);

    if (idleProp && idleProp.statusCode == 200 && !idleProp.data) {
      const metaData = await this.sendCommand('get_property', ['metadata']);
      if (metaData && metaData.statusCode == 200 && metaData.data) {
        return metaData.data;
      }
    }

    return {};
  }

  async getStatus() {
    const result: any = {
      playing: false,
      active: false,
      url: '',
      volume: 0,
      position: 0.0,
    };
    const pathProp = await this.sendCommand('get_property', ['path']);
    const volProp = await this.sendCommand('get_property', ['volume']);
    const metaData = await this.sendCommand('get_property', ['metadata']);
    const playbackProp = await this.sendCommand('get_property', [
      'playback-time',
    ]);
    const idleProp = await this.sendCommand('get_property', ['core-idle']);

    if (playbackProp && playbackProp.statusCode == 200) {
      result.position = playbackProp.data;
    }

    if (metaData && metaData.statusCode == 200) {
      result.metadata = metaData.data;
    }
    if (idleProp && idleProp.statusCode == 200) {
      result.playing = !idleProp.data;
    }

    if (pathProp && pathProp.statusCode == 200) {
      result.active = true;
      result.url = pathProp.data;
    }
    if (volProp && volProp.statusCode == 200) {
      result.volume = volProp.data;
    }

    return MpvStatusMapper(result);
  }

  async play(url: string) {
    await this.stopStream();
    let state = await this.sendCommand('loadfile', [url, 'replace']);
    this.eventEmitter.emit('player', {
      type: 'stateChanged',
      paused: false,
      source: 'mpv',
    });
    return state;
  }

  async stop() {
    let res = await this.sendCommand('stop', []);
    await this.clearPlaylist();
    let state = StateService.loadState() ?? new State();
    state.track = {};
    StateService.saveState(state);

    this.eventEmitter.emit('player', {
      type: 'stateChanged',
      paused: true,
      source: 'mpv',
    });
    this.eventEmitter.emit('player', {
      type: 'stopped',
      source: 'mpv',
    });
    return res;
  }

  async pause() {
    let state = await this.sendCommand('set_property', ['pause', true]);
    this.eventEmitter.emit('player', {
      type: 'stateChanged',
      paused: true,
      source: 'mpv',
    });
    return state;
  }

  async resume() {
    let state = await this.sendCommand('set_property', ['pause', false]);
    this.eventEmitter.emit('player', {
      type: 'stateChanged',
      paused: false,
      source: 'mpv',
    });
    return state;
  }

  async previous() {}

  async next(url: string) {
    return await this.sendCommand('loadfile', [url, 'replace']);
  }

  async getVolume() {
    const volProp = await this.sendCommand('get_property', ['volume']);
    if (volProp && volProp.statusCode == 200) {
      return volProp.data;
    }
    return 0;
  }

  async setVolume(volume: number) {
    let state = StateService.loadState() ?? new State();
    state.volumeMpv = volume;
    StateService.saveState(state);
    let res = await this.sendCommand('set_property', ['volume', `${volume}`]);
    this.eventEmitter.emit('player', {
      type: 'volumeChanged',
      volume: volume,
      source: 'mpv',
    });
    return res;
  }
}
