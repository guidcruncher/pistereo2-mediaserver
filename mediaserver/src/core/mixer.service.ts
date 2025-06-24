import { State, StateService } from '../state/state.service';
import { OnModuleInit, Injectable, Logger } from '@nestjs/common';
import { Channel, Frequency, Mixer } from './equaliser';
import * as cp from 'child_process';
import * as fs from 'node:fs';

@Injectable()
export class MixerService implements OnModuleInit {
  private readonly logger = new Logger(MixerService.name, { timestamp: true });

  async onModuleInit(): Promise<void> {
    await this.loadMixer('equal');
  }

  async getMixer(device: string): Promise<Mixer> {
    const equal: Mixer = await this.contents(device);
    return equal;
  }

  async updateMixer(device: string, mixer: Mixer) {
    for (let i = 0; i < mixer.frequencies.length; i++) {
      const f: Frequency = mixer.frequencies[i];
      await this.cset(device, f.numid, f.channels);
    }
    let s = StateService.loadState();
    if (!s) {
      s = new State();
    }
    s.mixer = mixer;
    StateService.saveState(s);
    return mixer;
  }

  async resetMixer(device: string, level: number) {
    const mixer = await this.getMixer(device);
    for (let i = 0; i < mixer.frequencies.length; i++) {
      const f: Frequency = mixer.frequencies[i];
      f.channels.forEach((ch) => {
        ch.value = level;
      });
      await this.cset(device, f.numid, f.channels);
    }
    let s = StateService.loadState();
    if (!s) {
      s = new State();
    }
    s.mixer = mixer;
    StateService.saveState(s);
    return mixer;
  }

  async loadMixer(device: string) {
    let s = StateService.loadState();
    if (!s) {
      s = new State();
    }
    if (s.mixer) {
      return await this.updateMixer(device, s.mixer);
    }

    return await this.resetMixer(device, 60);
  }

  private async cset(device: string, numid: number, values: Channel[]) {
    return await this.amixer([
      '-D',
      device,
      'cset',
      `numid=${numid}`,
      `${values
        .map((a) => {
          return a.value;
        })

        .join(',')}`,
    ]);
  }

  private async contents(device: string): Promise<Mixer> {
    const ch = await this.amixer(['-D', device, 'scontents']);
    const res = await this.amixer(['-D', device, 'contents']);
    const contents = await this.parseContents(res, ch);
    contents.device = device;
    let s = StateService.loadState();
    if (!s) {
      s = new State();
    }
    s.mixer = contents;
    StateService.saveState(s);
    return contents;
  }

  private async amixer(params): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!fs.existsSync('/usr/bin/amixer')) {
        resolve('');
        return;
      }

      try {
        let stdout = '';
        let stderr = '';

        const amixer = cp.spawn('/usr/bin/amixer', params);

        amixer.stdout.on('data', (data) => {
          stdout += data.toString();
        });

        amixer.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        amixer.on('close', (code) => {
          if (code === 0) {
            resolve(stdout);
          } else {
            reject(new Error(stderr));
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  private async parseContents(data: string, controls: string): Promise<Mixer> {
    const m: Mixer = new Mixer();
    const channels: string[] = controls
      .split('\n')
      .map((a) => {
        return a.trim();
      })
      .filter((a) => {
        return a.startsWith('Playback channels:');
      })
      .map((a) => a.slice(18).split('-'))[0];
    const lines: string[] = data
      .split('\n')
      .filter((n) => n && n.trim() != '')
      .map((n) => {
        let v: string = n.trim();
        if (v.startsWith('; ') || v.startsWith(': ')) {
          v = v.slice(2);
        }
        return v;
      });
    let i = 0;

    while (i < lines.length) {
      if (lines[i].startsWith('num')) {
        const obj = {} as any;
        const fields: string[] =
          `${lines[i]},${lines[i + 1].replaceAll('values', 'channels')},${lines[i + 2].replaceAll(',', '_')}`
            .replaceAll("'", '')
            .split(',');
        fields.map((a) => {
          const b = a.split('=');
          if (b[0] == 'values') {
            b[1] = b[1].replace('_', ',');
          }

          obj[b[0]] = b[1];
          return b;
        });
        const f = new Frequency();
        f.numid = parseInt(obj['numid']);
        f.min = parseInt(obj['min']);
        f.max = parseInt(obj['max']);
        f.steps = parseInt(obj['step']);
        f.name = obj['name'] ?? '';
        f.title = f.name
          .slice(f.name.indexOf(' '))
          .replaceAll(' Playback Volume', '')
          .trim();
        f.channels = obj['values'].split(',').map((v, index) => {
          return { name: channels[index].trim(), value: parseInt(v) };
        });
        f.value = f.channels[0].value;
        m.frequencies.push(f);
        i = i + 2;
      }
      i = i + 1;
    }

    return m;
  }
}
