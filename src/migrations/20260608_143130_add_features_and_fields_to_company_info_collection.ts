import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "website_info_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"description" varchar NOT NULL
  );
  
  ALTER TABLE "groups" DROP CONSTRAINT "groups_teacher_id_users_id_fk";
  
  ALTER TABLE "lessons" ALTER COLUMN "teacher_id" DROP NOT NULL;
  ALTER TABLE "website_info" ADD COLUMN "whats_app" varchar NOT NULL;
  ALTER TABLE "website_info_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "website_info_features" ADD CONSTRAINT "website_info_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website_info_features" ADD CONSTRAINT "website_info_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website_info"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "website_info_features_order_idx" ON "website_info_features" USING btree ("_order");
  CREATE INDEX "website_info_features_parent_id_idx" ON "website_info_features" USING btree ("_parent_id");
  CREATE INDEX "website_info_features_icon_idx" ON "website_info_features" USING btree ("icon_id");
  ALTER TABLE "groups" ADD CONSTRAINT "groups_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website_info_rels" ADD CONSTRAINT "website_info_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "website_info_rels_media_id_idx" ON "website_info_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "website_info_features" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "website_info_features" CASCADE;
  ALTER TABLE "groups" DROP CONSTRAINT "groups_teacher_id_teachers_id_fk";
  
  ALTER TABLE "website_info_rels" DROP CONSTRAINT "website_info_rels_media_fk";
  
  DROP INDEX "website_info_rels_media_id_idx";
  ALTER TABLE "lessons" ALTER COLUMN "teacher_id" SET NOT NULL;
  ALTER TABLE "groups" ADD CONSTRAINT "groups_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website_info" DROP COLUMN "whats_app";
  ALTER TABLE "website_info_rels" DROP COLUMN "media_id";`)
}
