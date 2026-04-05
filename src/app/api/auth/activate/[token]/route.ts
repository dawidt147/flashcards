import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { activateUser } from '@/lib/convex/users';
import { getUserMeta, getUserMetaByNameAndValue } from '@/lib/convex/userMeta';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.pathname.split("/").pop() || "";
  const activationToken = await getUserMetaByNameAndValue("activationToken", token);

  if (!activationToken) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  const activationTokenExpiryDate = await getUserMeta(
    activationToken.userId,
    "activationTokenExpiryDate",
  );

  if (!activationTokenExpiryDate) {
    return NextResponse.json({ error: "Invalid activation data" }, { status: 400 });
  }

  const expiryMs = Number.parseInt(activationTokenExpiryDate.value, 10);
  if (Number.isNaN(expiryMs) || Date.now() > expiryMs) {
    return NextResponse.json({ error: "Link expired" }, { status: 400 });
  }

  const result = await activateUser(activationToken.userId);

  if (result.alreadyActive) {
    return NextResponse.redirect(new URL("/login?activated=already", request.nextUrl));
  }

  return NextResponse.redirect(new URL("/login?activated=1", request.nextUrl));
}
