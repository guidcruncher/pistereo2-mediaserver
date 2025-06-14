import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrespotModule } from './librespot/librespot.module';
import { MpvModule } from './mpv/mpv.module';
import { TransportService } from './transport.service';

@Module({
  imports: [EventEmitterModule.forRoot(), LibrespotModule, MpvModule],
  controllers: [AppController],
  providers: [AppService, TransportService],
  exports: [TransportService],
})
export class AppModule {}
