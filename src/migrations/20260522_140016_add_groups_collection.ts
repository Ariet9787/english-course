import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_groups_schedule_day" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  CREATE TYPE "public"."enum_groups_group_level" AS ENUM('a1', 'a2', 'b1', 'b2', 'c1', 'c2');
  CREATE TABLE "groups_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_groups_schedule_day",
  	"start_time" timestamp(3) with time zone,
  	"end_time" timestamp(3) with time zone
  );
  
  CREATE TABLE "groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"teacher_id" integer NOT NULL,
  	"group_level" "enum_groups_group_level" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "groups_id" integer;
  ALTER TABLE "groups_schedule" ADD CONSTRAINT "groups_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "groups" ADD CONSTRAINT "groups_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "groups_schedule_order_idx" ON "groups_schedule" USING btree ("_order");
  CREATE INDEX "groups_schedule_parent_id_idx" ON "groups_schedule" USING btree ("_parent_id");
  CREATE INDEX "groups_teacher_idx" ON "groups" USING btree ("teacher_id");
  CREATE INDEX "groups_updated_at_idx" ON "groups" USING btree ("updated_at");
  CREATE INDEX "groups_created_at_idx" ON "groups" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_groups_fk" FOREIGN KEY ("groups_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("groups_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "groups_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "groups" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "groups_schedule" CASCADE;
  DROP TABLE "groups" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_groups_fk";
  
  DROP INDEX "payload_locked_documents_rels_groups_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "groups_id";
  DROP TYPE "public"."enum_groups_schedule_day";
  DROP TYPE "public"."enum_groups_group_level";`)
}
