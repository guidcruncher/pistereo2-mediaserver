import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as net from 'net';
import * as path from 'path';
import { MpvPlayerService } from './mpv-player.service';
import { LibrespotPlayerService } from '../librespot/librespot-player.service';

@Injectable()
export class MpvClientService {
  private socket: net.Socket;

  private static previousMetaData: any = {};

  private static lastMetaDataEmitted = new Date('2020-01-01T00:00:00');

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly mpvPlayer: MpvPlayerService,
  ) {
    this.open();
  }

  private async stopStream() {
    let mpv = new LibrespotPlayerService();
    return await mpv.stop();
  }

  private open() {
    const address: string = (process.env.PISTEREO_MPV_SOCKET as string) ?? '';

    this.socket = new net.Socket();
    this.socket.setEncoding('utf-8');

    this.socket.on('error', (error) => {});

    this.socket.on('close', (state) => {});

    this.socket.on('data', async (data) => {
      let json: any;
      try {
        json = JSON.parse(data.toString());
      } catch (err) {
        json = {};
      }

      if (json.event) {
        switch (json.event) {
          case 'file-loaded':
            this.stopStream();
            this.eventEmitter.emit('player', {
              type: 'file-loaded',
              data: json,
              source: 'mpv',
            });
            break;
          case 'end-file':
            if (json.reason === 'eof') {
              this.eventEmitter.emit('player', {
                type: 'endFile',
                data: json,
                source: 'mpv',
              });
            }
            break;
          case 'metadata-update':
            const seconds =
              (new Date().getTime() -
                MpvClientService.lastMetaDataEmitted.getTime()) /
              1000;

            if (seconds > 30) {
              const data: any = await this.mpvPlayer.getMetaData();
              if (Object.keys(data).length > 0) {
                if (
                  JSON.stringify(data) ===
                  JSON.stringify(MpvClientService.previousMetaData)
                ) {
                  // ignore
                  MpvClientService.lastMetaDataEmitted = new Date();
                } else {
                  this.eventEmitter.emit('player', {
                    type: 'metadataUpdate',
                    data: data,
                    source: 'mpv',
                  });
                  MpvClientService.previousMetaData = data;
                  MpvClientService.lastMetaDataEmitted = new Date();
                }
              }
            }

            break;
          default:
        }
      }
    });

    this.socket.connect({ path: address }, () => {});
  }
}
