import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'cbf492d55e013ef2373397baa4ed4583'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const weatherService = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
})

export const getWeather = async (city, unit = 'metric') => {
    try {
        console.log(`🌤️ Fetching weather for: "${city}" with unit: ${unit}`)

        const response = await weatherService.get('/weather', {
            params: {
                q: city.trim(),
                units: unit,  // 'metric' for Celsius, 'imperial' for Fahrenheit
                appid: API_KEY,
            },
        })

        console.log('✅ API Response received:', response.data)

        const data = response.data

        // The API now converts temperature based on 'units' parameter
        // So we can use the values directly
        return {
            name: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            wind_deg: data.wind.deg,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            pressure: data.main.pressure,
            visibility: data.visibility,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            timezone: data.timezone,
            dt: data.dt,
            coord: data.coord,
            main: data.weather[0].main,
            raw_temp: data.main.temp, // Keep original for debugging
        }
    } catch (error) {
        console.error('Weather API Error:', {
            error: error.response?.data || error.message,
            status: error.response?.status,
            url: error.config?.url
        })

        if (error.response?.status === 404) {
            throw new Error(`City "${city}" not found. Please check the spelling.`)
        }

        throw new Error(error.response?.data?.message || 'Failed to fetch weather data')
    }
}

// Add testApiConnection function
export const testApiConnection = async () => {
    try {
        console.log('🔧 Testing API connection...')
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`
        )
        
        if (response.ok) {
            const data = await response.json()
            console.log('✅ API Test Success:', data.name, data.weather[0].description)
            return { success: true, data }
        } else {
            const error = await response.json()
            console.error('❌ API Test Failed:', response.status, error)
            return { success: false, error }
        }
    } catch (err) {
        console.error('❌ API Test Exception:', err)
        return { success: false, error: err.message }
    }
}

export const getWeatherByCoords = async (lat, lon, unit = 'metric') => {
    try {
        const response = await weatherService.get('/weather', {
            params: {
                lat,
                lon,
                units: unit,
                appid: API_KEY,
            },
        })
        
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch weather data')
    }
}

export const checkApiStatus = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`
    )
    return response.ok ? 'Connected ✅' : 'Failed ❌'
  } catch {
    return 'Failed ❌'
  }
}