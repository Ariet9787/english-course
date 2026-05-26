import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_us" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"banner_id" integer NOT NULL,
  	"description" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "website_info" ADD COLUMN "banner_id" integer NOT NULL;
  ALTER TABLE "about_us" ADD CONSTRAINT "about_us_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_us_banner_idx" ON "about_us" USING btree ("banner_id");
  ALTER TABLE "website_info" ADD CONSTRAINT "website_info_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "website_info_banner_idx" ON "website_info" USING btree ("banner_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_us" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_us" CASCADE;
  ALTER TABLE "website_info" DROP CONSTRAINT "website_info_banner_id_media_id_fk";
  
  DROP INDEX "website_info_banner_idx";
  ALTER TABLE "website_info" DROP COLUMN "banner_id";`)
}
