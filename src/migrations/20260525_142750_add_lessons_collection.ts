import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "lessons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"group_id" integer NOT NULL,
  	"teacher_id" integer NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"homework" varchar,
  	"is_published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "lessons_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "lessons_id" integer;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_rels" ADD CONSTRAINT "lessons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_rels" ADD CONSTRAINT "lessons_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "lessons_group_idx" ON "lessons" USING btree ("group_id");
  CREATE INDEX "lessons_teacher_idx" ON "lessons" USING btree ("teacher_id");
  CREATE INDEX "lessons_updated_at_idx" ON "lessons" USING btree ("updated_at");
  CREATE INDEX "lessons_created_at_idx" ON "lessons" USING btree ("created_at");
  CREATE INDEX "lessons_rels_order_idx" ON "lessons_rels" USING btree ("order");
  CREATE INDEX "lessons_rels_parent_idx" ON "lessons_rels" USING btree ("parent_id");
  CREATE INDEX "lessons_rels_path_idx" ON "lessons_rels" USING btree ("path");
  CREATE INDEX "lessons_rels_media_id_idx" ON "lessons_rels" USING btree ("media_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_lessons_id_idx" ON "payload_locked_documents_rels" USING btree ("lessons_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "lessons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lessons_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "lessons" CASCADE;
  DROP TABLE "lessons_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_lessons_fk";
  
  DROP INDEX "payload_locked_documents_rels_lessons_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "lessons_id";`)
}
