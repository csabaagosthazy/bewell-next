import { NextResponse } from 'next/server'

export function GET() {
  console.log('hello called')
  return NextResponse.json({ message: 'Hello World!' })
}
