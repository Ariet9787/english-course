import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "features" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "features_id" integer;
  ALTER TABLE "features" ADD CONSTRAINT "features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "features_icon_idx" ON "features" USING btree ("icon_id");
  CREATE INDEX "features_updated_at_idx" ON "features" USING btree ("updated_at");
  CREATE INDEX "features_created_at_idx" ON "features" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_features_id_idx" ON "payload_locked_documents_rels" USING btree ("features_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "features" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "features" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_features_fk";
  
  DROP INDEX "payload_locked_documents_rels_features_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "features_id";`)
}
