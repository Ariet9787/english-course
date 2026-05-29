import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_lessons_attendance_exceptions_status" AS ENUM('absent', 'lated');
  CREATE TYPE "public"."enum_lessons_grades_type" AS ENUM('activity', 'homeworks', 'tests');
  CREATE TABLE "lessons_attendance_exceptions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"student_id" integer NOT NULL,
  	"status" "enum_lessons_attendance_exceptions_status" NOT NULL,
  	"comment" varchar
  );
  
  CREATE TABLE "lessons_grades" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"student_id" integer NOT NULL,
  	"grade" numeric NOT NULL,
  	"type" "enum_lessons_grades_type" NOT NULL,
  	"comment" varchar
  );
  
  ALTER TABLE "lessons_attendance_exceptions" ADD CONSTRAINT "lessons_attendance_exceptions_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_attendance_exceptions" ADD CONSTRAINT "lessons_attendance_exceptions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_grades" ADD CONSTRAINT "lessons_grades_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_grades" ADD CONSTRAINT "lessons_grades_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "lessons_attendance_exceptions_order_idx" ON "lessons_attendance_exceptions" USING btree ("_order");
  CREATE INDEX "lessons_attendance_exceptions_parent_id_idx" ON "lessons_attendance_exceptions" USING btree ("_parent_id");
  CREATE INDEX "lessons_attendance_exceptions_student_idx" ON "lessons_attendance_exceptions" USING btree ("student_id");
  CREATE INDEX "lessons_grades_order_idx" ON "lessons_grades" USING btree ("_order");
  CREATE INDEX "lessons_grades_parent_id_idx" ON "lessons_grades" USING btree ("_parent_id");
  CREATE INDEX "lessons_grades_student_idx" ON "lessons_grades" USING btree ("student_id");
  ALTER TABLE "lessons" DROP COLUMN "is_published";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "lessons_attendance_exceptions" CASCADE;
  DROP TABLE "lessons_grades" CASCADE;
  ALTER TABLE "lessons" ADD COLUMN "is_published" boolean DEFAULT false;
  DROP TYPE "public"."enum_lessons_attendance_exceptions_status";
  DROP TYPE "public"."enum_lessons_grades_type";`)
}
