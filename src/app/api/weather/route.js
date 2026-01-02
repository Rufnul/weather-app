import { NextResponse } from 'next/server'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')

    if (!city) {
        return NextResponse.json(
            { error: 'City parameter is required' },
            { status: 400 }
        )
    }

    try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        )

        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch weather data' },
            { status: 500 }
        )
    }
}