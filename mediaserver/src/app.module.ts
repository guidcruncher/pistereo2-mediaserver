import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrespotModule } from './librespot/librespot.module';
import { MpvModule } from './mpv/mpv.module';
import { TransportService } from './transport.service';
import { RegistryModule } from './registry/registry.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    LibrespotModule,
    MpvModule,
    RegistryModule,
  ],
  controllers: [AppController],
  providers: [AppService, TransportService],
  exports: [TransportService],
})
export class AppModule {}
