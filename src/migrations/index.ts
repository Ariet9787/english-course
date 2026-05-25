import * as migration_20260409_155706_initial from './20260409_155706_initial';
import * as migration_20260520_135354_add_role_to_users from './20260520_135354_add_role_to_users';
import * as migration_20260520_142343_add_teachers_collection from './20260520_142343_add_teachers_collection';
import * as migration_20260522_140016_add_groups_collection from './20260522_140016_add_groups_collection';
import * as migration_20260522_142612_add_students_collection from './20260522_142612_add_students_collection';
import * as migration_20260525_135546_add_posts_socials_and_websiteinfo_collections from './20260525_135546_add_posts_socials_and_websiteinfo_collections';

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
    name: '20260520_142343_add_teachers_collection',
  },
  {
    up: migration_20260522_140016_add_groups_collection.up,
    down: migration_20260522_140016_add_groups_collection.down,
    name: '20260522_140016_add_groups_collection',
  },
  {
    up: migration_20260522_142612_add_students_collection.up,
    down: migration_20260522_142612_add_students_collection.down,
    name: '20260522_142612_add_students_collection',
  },
  {
    up: migration_20260525_135546_add_posts_socials_and_websiteinfo_collections.up,
    down: migration_20260525_135546_add_posts_socials_and_websiteinfo_collections.down,
    name: '20260525_135546_add_posts_socials_and_websiteinfo_collections'
  },
];
