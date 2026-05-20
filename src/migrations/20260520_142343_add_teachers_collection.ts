import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_teachers_status" AS ENUM('active', 'terminated', 'vacation');
  CREATE TABLE "teachers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"full_name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"hire_date" timestamp(3) with time zone NOT NULL,
  	"termination_date" timestamp(3) with time zone,
  	"status" "enum_teachers_status" NOT NULL,
  	"salary" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "teachers_id" integer;
  ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "teachers_user_idx" ON "teachers" USING btree ("user_id");
  CREATE INDEX "teachers_updated_at_idx" ON "teachers" USING btree ("updated_at");
  CREATE INDEX "teachers_created_at_idx" ON "teachers" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_teachers_fk" FOREIGN KEY ("teachers_id") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_teachers_id_idx" ON "payload_locked_documents_rels" USING btree ("teachers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "teachers" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "teachers" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_teachers_fk";
  
  DROP INDEX "payload_locked_documents_rels_teachers_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "teachers_id";
  DROP TYPE "public"."enum_teachers_status";`)
}
