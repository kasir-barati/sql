-- AlterTable: add optional column
ALTER TABLE "users" ADD COLUMN     "birthdate" TIMESTAMP(3);

-- Update currently existing records
UPDATE "users" SET "birthdate"=CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN     "birthdate" SET NOT NULL;
