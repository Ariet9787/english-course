import * as migration_20260409_155706_initial from './20260409_155706_initial';
import * as migration_20260520_135354_add_role_to_users from './20260520_135354_add_role_to_users';
import * as migration_20260520_142343_add_teachers_collection from './20260520_142343_add_teachers_collection';

export const migrations = [
  {
    up: migration_20260409_155706_initial.up,
    down: migration_20260409_155706_initial.down,
    name: '20260409_155706_initial',
  },
  {
    up: migration_20260520_135354_add_role_to_users.up,
    down: migration_20260520_135354_add_role_to_users.down,
    name: '20260520_135354_add_role_to_users',
  },
  {
    up: migration_20260520_142343_add_teachers_collection.up,
    down: migration_20260520_142343_add_teachers_collection.down,
    name: '20260520_142343_add_teachers_collection'
  },
];
