import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getUser, getCompanyById } from "@/lib/db/index";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;
  const user = await getUser(userEmail);
  if (user.roleIdNumber === null) {
    return NextResponse.json({ error: "Company ID is null" }, { status: 400 });
  }
  const company = await getCompanyById(user.roleIdNumber);

  return NextResponse.json({ company });
}
