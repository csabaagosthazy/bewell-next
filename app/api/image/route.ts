import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    console.log('hello called')
    return NextResponse.json({ message: 'Hello World!' })
}

export async function POST(req: NextRequest) {
    console.log(req)
    return NextResponse.json({ message: 'Hello World!' })
}