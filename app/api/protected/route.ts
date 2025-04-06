import { getServerSession } from "next-auth/next"
import { getToken } from "next-auth/jwt"
import { authOptions } from "@/app/api/auth/_options"
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session) {
    // Signed in
    const token = await getToken({ req: request })
    console.log(token)
    console.log("Session", JSON.stringify(session, null, 2))
    return NextResponse.json(session, { status: 200 })
  } else {
    // Not Signed in
    return NextResponse.json({ error: "Not signed in" }, { status: 401 })
  }
}
