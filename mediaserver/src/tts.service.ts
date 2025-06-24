import * as googleTTS from 'google-tts-api';
import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as child_process from 'node:child_process';
import { Readable } from 'stream';
import { State, StateService } from './state/state.service';

Injectable();
export class TtsService {
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
    const results = googleTTS.getAllAudioUrls(text, {
      lang: lang,
      slow: slow,
      host: 'https://translate.google.com',
      splitPunct: ',.?',
    });

    for (var i = 0; i < results.length; i++) {
      await this.downloadFile(results[i].url, this.getFilename(`${i}.mp3`));
    }

    let st = StateService.loadState();
    let cmd = 'mpv --no-video ';
    if (st && st.volumeMpv) {
      cmd += ' --volume ' + st.volumeMpv.toString() + ' ';
    }

    for (var i = 0; i < results.length; i++) {
      cmd += `${this.getFilename(`${i}.mp3`)} `;
    }

    child_process.execSync(cmd);

    for (var i = 0; i < results.length; i++) {
      fs.unlinkSync(this.getFilename(`${i}.mp3`));
    }

    return results;
  }
}
