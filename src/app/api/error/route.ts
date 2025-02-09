// import { NextResponse } from 'next/server'
//
// async function GET(request: Request) {
//     const queryString = new URL(request.url).search
//     const params = new URLSearchParams(queryString)
//     const code = params.get('code') || 500
//     const message = params.get('message')
//     return new NextResponse('Error occurred: ' + message, { status: Number(code) })
// }
//
// export { GET }
//

import { NextResponse } from 'next/server'

// Типы для ошибок
interface ErrorResponse {
    code: number;
    message: string;
}

// Константы с кодами ошибок
const ERROR_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
} as const;

// Функция для обработки GET запросов
async function GET(request: Request) {
    try {
        const queryString = new URL(request.url).search;
        const params = new URLSearchParams(queryString);

        const code = Number(params.get('code')) || ERROR_CODES.INTERNAL_SERVER;
        const message = params.get('message') || 'Unknown error occurred';

        // Проверка валидности кода ошибки
        if (!Object.values(ERROR_CODES).includes(code)) {
            return NextResponse.json(
                { error: 'Invalid error code' },
                { status: ERROR_CODES.BAD_REQUEST }
            );
        }

        // Формируем ответ с ошибкой
        const errorResponse: ErrorResponse = {
            code,
            message
        };

        return NextResponse.json(
            errorResponse,
            {
                status: code,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            {
                code: ERROR_CODES.INTERNAL_SERVER,
                message: 'Internal server error'
            },
            { status: ERROR_CODES.INTERNAL_SERVER }
        );
    }
}

// Функция для обработки POST запросов
async function POST(request: Request) {
    try {
        const data = await request.json();
        // Здесь логика обработки POST запроса
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json(
            {
                code: ERROR_CODES.INTERNAL_SERVER,
                message: 'Internal server error processing POST request'
            },
            { status: ERROR_CODES.INTERNAL_SERVER }
        );
    }
}

export { GET, POST }
``