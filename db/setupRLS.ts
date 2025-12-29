import { db } from "@/lib/db/db";
import { sql } from "drizzle-orm";

async function setupRLS() {
  /* stores RLS */
  await db.execute(sql`ALTER TABLE stores ENABLE ROW LEVEL SECURITY;`);
  await db.execute(sql`
	CREATE POLICY "admin manager full access"
	ON stores
	FOR ALL
	TO authenticated
	USING (
		EXISTS (
		SELECT 1 FROM users
		WHERE id = auth.uid()
		AND role IN ('admin','manager')
		AND company_id = company.id
		)
	)
	WITH CHECK (
		EXISTS (
		SELECT 1 FROM users
		WHERE id = auth.uid()
		AND role IN ('admin','manager')
		AND company_id = company.id
		)
	);
`);

  await db.execute(sql`
	CREATE POLICY "staff read only"
	ON company
	FOR SELECT
	TO authenticated
	USING (
		EXISTS (
		SELECT 1 FROM users
		WHERE id = auth.uid()
		AND role = 'staff'
		AND company_id = company.id
		)
	);
`);
}

setupRLS().catch(console.error);
