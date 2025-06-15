import { OnModuleInit, HttpException, Injectable } from '@nestjs/common';
import * as net from 'net';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { State, StateService } from '../state/state.service';

const execFile = util.promisify(require('node:child_process').execFile);

const errorCodes: Record<string, number> = {
  success: 200,
  'property not found': 404,
  'property unavailable': 400,
};

@Injectable()
export class MpvPlayerService implements OnModuleInit {
  onModuleInit() {
    let state = StateService.loadState();
    if (state) {
      this.setVolume(state.volumeMpv);
    }
  }

  private async sendCommand(cmd: string, parameters: any[] = []): Promise<any> {
    let commandText: any[] = [cmd];
    commandText = commandText.concat(parameters);
    const jsonCmd: string = JSON.stringify({ command: commandText });
    const socket: string = (process.env.PISTEREO_MPV_SOCKET as string) ?? '';
    const cmdArgs: string[] = ['-c', `echo '${jsonCmd}' | socat - ${socket}`];

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
              resolve({
                statusCode: 500,
                command: jsonCmd,
              });
            }
          })
          .catch((err) => {
            resolve({ statusCode: 500, command: jsonCmd });
            //reject(err)
          });
      } catch (err) {
        reject(err);
      }
    });
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

    return result;
  }

  async play(url: string) {
    return await this.sendCommand('loadfile', [url, 'replace']);
  }

  async stop() {
    return await this.sendCommand('stop', []);
  }

  async pause() {
    return await this.sendCommand('set_property', ['pause', true]);
  }

  async resume() {
    return await this.sendCommand('set_property', ['pause', false]);
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
    let state = StateService.loadState() ?? new State()
    state.volumeMpv = volume;
    StateService.saveState(state);
    return await this.sendCommand('set_property', ['volume', `${volume}`]);
  }
}
