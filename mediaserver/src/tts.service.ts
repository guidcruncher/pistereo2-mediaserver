import * as googleTTS from 'google-tts-api';
import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as http from 'node:http';
import * as https from 'node:https';
import * as childprocess from 'node:child_process';

Injectable();
export class TtsService {
  private getFilename(file: string) {
    return path.join((process.env.PISTEREO_CACHE ?? '') as string, file);
  }

  private async downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
      const info = urlParse(url);
      const httpClient = info.protocol === 'https:' ? https : http;
      const options = {
        host: info.host,
        path: info.path,
        headers: {
          'user-agent': 'WHAT_EVER',
        },
      };

      httpClient
        .get(options, (res) => {
          // check status code
          if (res.statusCode !== 200) {
            const msg = `request to ${url} failed, status code = ${res.statusCode} (${res.statusMessage})`;
            reject(new Error(msg));
            return;
          }

          const file = fs.createWriteStream(dest);
          file.on('finish', function () {
            // close() is async, call resolve after close compxxxxxletes.
            file.close(resolve);
          });
          file.on('error', function (err) {
            // Delete the file async. (But we don't check the result)
            fs.unlink(dest);
            reject(err);
          });

          res.pipe(file);
        })
        .on('error', reject)
        .end();
    });
  }

  async say(token: string, text: string, lang: string, slow: boolean) {
    const results = googleTTS.getAllAudioUrls(text, {
      lang: lang,
      slow: slow,
      host: 'https://translate.google.com',
      splitPunct: ',.?',
    });

    for (var i = 0; i < results.length; i++) {
      await this.downloadFile(results[i], this.getFilename(`${i}.mp3`));
    }

    let cmd = 'mpv ';
    for (var i = 0; i < results.length; i++) {
      cmd += `${this.getFilename(`${i}.mp3`)} `;
    }

    child_process.execSync(cmd);

    for (var i = 0; i < results.length; i++) {
      fs.unlinkSync(this.getFilename(`${i}.mp3`));
    }
  }
}
