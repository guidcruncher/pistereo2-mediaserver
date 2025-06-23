import * as dns from 'node:dns';
import * as os from 'node:os';
import * as ws from 'ws';
import * as crypto from 'node:crypto';
import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SocketGateway {
  private readonly logger: Logger = new Logger(SocketGateway.name, {
    timestamp: true,
  });

  private server: any = {};

  constructor() {
    this.initialise();
  }

  private initialise() {
    this.logger.debug('Initialising socket server');
    this.server = new ws.WebSocketServer({ port: 4678 });

    this.server.on('connection', function (socket) {
      let logger: Logger = new Logger(SocketGateway.name, { timestamp: true });
      logger.debug('Connection established');

      // When you receive a message, send that message to every socket.
      socket.on('message', function (msg) {
        let logger: Logger = new Logger(SocketGateway.name, {
          timestamp: true,
        });
        logger.verbose('Recieved message ', msg);
      });

      // When a socket closes, or disconnects, remove it from the array.
      socket.on('close', function () {
        let logger: Logger = new Logger(SocketGateway.name, {
          timestamp: true,
        });
        logger.debug('Socket closed');
      });
    });
  }

  public broadcastMessage(event: string, payload: any) {
    let data: string = JSON.stringify({ event: event, payload: payload });
    this.logger.verbose('Broadcasting to server', data);
    this.server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false });
      }
    });
  }

  @OnEvent('player')
  private handleOnPLayerEvent(event: any) {
    this.logger.verbose('Intercepted player event', JSON.stringify(event));

    let ev: any = event;
    ev.hostname = os.hostname();
    ev.id = crypto.createHash('sha256').update(os.hostname()).digest('hex');
    this.broadcastMessage('player', ev);
  }
}
