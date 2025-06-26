import * as googleTTS from 'google-tts-api';
import { Logger, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as child_process from 'node:child_process';
import { Readable } from 'stream';
import { State, StateService } from './state/state.service';

Injectable();
export class TtsService {
  private readonly logger: Logger = new Logger(TtsService.name, {
    timestamp: true,
  });

  private getFilename(file: string) {
    return path.join((process.env.PISTEREO_CACHE ?? '') as string, file);
  }

  private async downloadFile(url, filename) {
    const response = await fetch(url);
    if (response.ok && response.body) {
      const buffer = await response.bytes();
      fs.writeFileSync(filename, buffer);
    }
  }

  async say(token: string, text: string, lang: string, slow: boolean) {
    this.logger.debug('Passing request to Google TTS');

    const results = await googleTTS.getAudioBase64(text, {
      lang: lang,
      slow: slow,
      host: 'https://translate.google.com',
      splitPunct: ',.?',
    });

    // save the audio file
    this.logger.verbose('Saving audio buffer');
    const buffer = Buffer.from(results, 'base64');
    fs.writeFileSync(this.getFilename(`0.mp3`), buffer, { encoding: 'base64' });

    let st = StateService.loadState();
    let cmd = 'mpv --no-video ';
    if (st && st.volumeMpv) {
      cmd += ' --volume=' + st.volumeMpv.toString() + ' ';
    }

    cmd += `${this.getFilename(`0.mp3`)} `;
    let res = '';

    try {
      this.logger.verbose(`Running command ${cmd}`);

      res = child_process.execSync(cmd, { encoding: 'utf8', timeout: 10000 });
    } catch (err) {
      this.logger.error('Error running tts player', err);
    }

    this;
    fs.unlinkSync(this.getFilename(`0.mp3`));

    return {output: res};
  }
}
