import * as fs from 'node:fs';
import * as path from 'node:path';

export class State {
  volumeLibRespot: number;
  volumeMpv: number;
}

export class StateService {
  static loadState() {
    let file = path.join(process.env.PISTEREO_CONFIG as string, 'state.json');

    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    return new State();
  }

  static saveState(state: State) {
    let file = path.join(process.env.PISTEREO_CONFIG as string, 'state.json');
    if (fs.existsSync(file)) {
      fs.unlink(file);
    }

    fs.writeFileSync(file, JSON.stringify(state), 'utf8');
    return state;
  }
}
