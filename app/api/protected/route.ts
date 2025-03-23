import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/_options"
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2))
    return NextResponse.json(session, {status: 200})
  } else {
    // Not Signed in
    return NextResponse.json({error: "Not signed in"}, {status: 401})
  }
}
