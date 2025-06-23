import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class LibrespotAuthService {
  getLibrespotToken() {
    let filename = path.join(
      process.env.PISTEREO_CONFIG as string,
      '.librespot',
      'state.json',
    );

    if (fs.existsSync(filename)) {
      let json = JSON.parse(fs.readFileSync(filename, 'utf8'));
      return json.credentials.data ?? '';
    }

    return '';
  }
}
