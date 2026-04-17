import * as migration_20260413_195946 from './20260413_195946';
import * as migration_20260417_183720 from './20260417_183720';

export const migrations = [
  {
    up: migration_20260413_195946.up,
    down: migration_20260413_195946.down,
    name: '20260413_195946',
  },
  {
    up: migration_20260417_183720.up,
    down: migration_20260417_183720.down,
    name: '20260417_183720'
  },
];
