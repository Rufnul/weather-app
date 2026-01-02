'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getWeather } from '@/lib/weatherService'
import LoadingSpinner from './LoadingSpinner'
import { FaTint, FaWind } from 'react-icons/fa'

const MAJOR_CITIES = [
    'New York',
    'London',
    'Tokyo',
    'Dubai',
    'Paris',
    'Sydney',
    'Chennai',
    'Singapore',
    'Mumbai',
    'Shanghai',
    'Berlin',
    'Toronto',
    'São Paulo',
    'Cairo',
    'Moscow'
]

export default function WorldWeatherGrid({ unit }) {
    const [citiesWeather, setCitiesWeather] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCitiesWeather = async () => {
            setLoading(true)
            setError(null)

            try {
                console.log(`Fetching world weather with unit: ${unit}`)
                const promises = MAJOR_CITIES.map(city =>
                    getWeather(city, unit).catch(error => {
                        console.warn(`Failed to fetch ${city}:`, error.message)
                        return null
                    })
                )

                const results = await Promise.all(promises)
                const validResults = results.filter(result => result !== null)

                console.log('World weather data loaded:', validResults)
                setCitiesWeather(validResults)

                if (validResults.length === 0) {
                    setError('Unable to load world weather data')
                }
            } catch (error) {
                console.error('Error in world weather grid:', error)
                setError('Failed to load world weather overview')
            } finally {
                setLoading(false)
            }
        }

        fetchCitiesWeather()

        // Refresh every 10 minutes
        const interval = setInterval(fetchCitiesWeather, 10 * 60 * 1000)
        return () => clearInterval(interval)
    }, [unit])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
                <p className="ml-4 text-gray-600 dark:text-gray-400">Loading world weather...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
                <p className="text-yellow-700 dark:text-yellow-300">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {citiesWeather.map((city) => {
                const tempInCelsius = unit === 'imperial' ? Math.round((city.temp - 32) * 5 / 9) : city.temp

                const getTempColor = () => {
                    if (tempInCelsius >= 30) return 'bg-gradient-to-br from-red-500 to-orange-500'
                    if (tempInCelsius >= 25) return 'bg-gradient-to-br from-orange-400 to-yellow-400'
                    if (tempInCelsius >= 20) return 'bg-gradient-to-br from-yellow-300 to-green-300'
                    if (tempInCelsius >= 15) return 'bg-gradient-to-br from-green-400 to-cyan-400'
                    if (tempInCelsius >= 10) return 'bg-gradient-to-br from-cyan-400 to-blue-400'
                    if (tempInCelsius >= 0) return 'bg-gradient-to-br from-blue-400 to-indigo-500'
                    return 'bg-gradient-to-br from-indigo-500 to-purple-600'
                }

                return (
                    <div
                        key={`${city.name}-${city.country}`}
                        className="glass-effect rounded-2xl p-4 card-hover group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
                                    {city.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {city.country}
                                </p>
                            </div>
                            <div className="relative w-12 h-12">
                                <Image
                                    src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                                    alt={city.description}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                    unoptimized={true} // For development
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className={`inline-block px-3 py-1 rounded-full ${getTempColor()} text-white font-bold text-2xl`}>
                                {city.temp}{unit === 'metric' ? '°C' : '°F'}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize mt-2">
                                {city.description}
                            </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <FaTint className="text-cyan-500" size={12} />
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Humidity</p>
                                        <p className="font-semibold">{city.humidity}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaWind className="text-green-500" size={12} />
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Wind</p>
                                        <p className="font-semibold">
                                            {unit === 'metric'
                                                ? `${city.wind_speed.toFixed(1)} m/s`
                                                : `${(city.wind_speed * 2.237).toFixed(1)} mph`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}