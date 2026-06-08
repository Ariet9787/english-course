import * as migration_20260409_155706_initial from './20260409_155706_initial';
import * as migration_20260520_135354_add_role_to_users from './20260520_135354_add_role_to_users';
import * as migration_20260520_142343_add_teachers_collection from './20260520_142343_add_teachers_collection';
import * as migration_20260522_140016_add_groups_collection from './20260522_140016_add_groups_collection';
import * as migration_20260522_142612_add_students_collection from './20260522_142612_add_students_collection';
import * as migration_20260525_135546_add_posts_socials_and_websiteinfo_collections from './20260525_135546_add_posts_socials_and_websiteinfo_collections';
import * as migration_20260525_142750_add_lessons_collection from './20260525_142750_add_lessons_collection';
import * as migration_20260526_164822_add_about_us_global from './20260526_164822_add_about_us_global';
import * as migration_20260529_141824_update_lessons_collection from './20260529_141824_update_lessons_collection';
import * as migration_20260608_143130_add_features_and_fields_to_company_info_collection from './20260608_143130_add_features_and_fields_to_company_info_collection';

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
    name: '20260525_135546_add_posts_socials_and_websiteinfo_collections',
  },
  {
    up: migration_20260525_142750_add_lessons_collection.up,
    down: migration_20260525_142750_add_lessons_collection.down,
    name: '20260525_142750_add_lessons_collection',
  },
  {
    up: migration_20260526_164822_add_about_us_global.up,
    down: migration_20260526_164822_add_about_us_global.down,
    name: '20260526_164822_add_about_us_global',
  },
  {
    up: migration_20260529_141824_update_lessons_collection.up,
    down: migration_20260529_141824_update_lessons_collection.down,
    name: '20260529_141824_update_lessons_collection',
  },
  {
    up: migration_20260608_143130_add_features_and_fields_to_company_info_collection.up,
    down: migration_20260608_143130_add_features_and_fields_to_company_info_collection.down,
    name: '20260608_143130_add_features_and_fields_to_company_info_collection'
  },
];
