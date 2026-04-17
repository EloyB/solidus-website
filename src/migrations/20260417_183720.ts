import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ALTER COLUMN "cta_url" SET DEFAULT 'mailto:info@soliduscapital.org';
  ALTER TABLE "investments" ADD COLUMN "link" varchar;
  ALTER TABLE "_investments_v" ADD COLUMN "version_link" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ALTER COLUMN "cta_url" SET DEFAULT '/contact';
  ALTER TABLE "investments" DROP COLUMN "link";
  ALTER TABLE "_investments_v" DROP COLUMN "version_link";`)
}
