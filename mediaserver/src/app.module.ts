import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrespotModule } from './librespot/librespot.module';
import { MpvModule } from './mpv/mpv.module';
import { TransportService } from './transport.service';
import { RegistryModule } from './registry/registry.module';
import { SocketServerModule } from './socket-server/socket-server.module';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';
import { AudioService } from './audio.service';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    LibrespotModule,
    MpvModule,
    RegistryModule,
    SocketServerModule,
    CoreModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService, TransportService, AudioService],
  exports: [TransportService],
})
export class AppModule {}
