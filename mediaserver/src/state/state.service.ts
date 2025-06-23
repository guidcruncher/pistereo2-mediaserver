import * as fs from 'node:fs';
import * as path from 'node:path';
import { Channel, Frequency, Mixer } from '../data/equaliser';

export class State {
  volumeLibRespot: number;
  volumeMpv: number;
  track: any;
  mixer: Mixer;
}

export class StateService {
  static loadState() {
    try {
      let file = path.join(process.env.PISTEREO_CONFIG as string, 'state.json');

      if (fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
      }
    } catch (err) {}

    return undefined;
  }

  static saveState(state: State) {
    try {
      let file = path.join(process.env.PISTEREO_CONFIG as string, 'state.json');
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }

      fs.writeFileSync(file, JSON.stringify(state), 'utf8');
      return state;
    } catch (err) {}

    return undefined;
  }
}
