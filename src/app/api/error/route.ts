import { NextResponse } from 'next/server'

async function GET(request: Request) {
    const queryString = new URL(request.url).search
    const params = new URLSearchParams(queryString)
    const code = params.get('code') || 500
    const message = params.get('message')
    return new NextResponse('Error occurred: ' + message, { status: Number(code) })
}

export { GET }
