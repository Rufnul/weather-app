import Image from 'next/image'
import {
    formatTime,
    formatDate,
    getWindDirection,
    capitalizeFirstLetter,
    formatVisibility,
    getTempColor,
    formatWindSpeed
} from '@/lib/utils'
import {
    FaThermometerHalf,
    FaTint,
    FaWind,
    FaEye,
    FaSun,
    FaMoon,
    FaCompass,
    FaCloud,
    FaCalendarAlt
} from 'react-icons/fa'

export default function WeatherCard({ weather, unit }) {
    const tempUnit = unit === 'metric' ? '°C' : '°F'

    // Debug logging
    console.log('WeatherCard Data:', {
        city: weather.name,
        temp: weather.temp,
        unit: unit,
        description: weather.description,
        feels_like: weather.feels_like,
        humidity: weather.humidity,
        wind_speed: weather.wind_speed,
        raw_data: weather
    })

    return (
        <div className="glass-effect rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Weather Info */}
                <div className="lg:col-span-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <FaCalendarAlt className="text-gray-400" />
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                                    {weather.name}, {weather.country}
                                </h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                {formatDate(weather.dt, weather.timezone)}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                                <FaCompass className="mr-2" />
                                Local Time: {formatTime(weather.dt, weather.timezone)}
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                            <div className="flex items-center justify-end space-x-4">
                                <div className="text-right">
                                    <div className={`text-6xl font-bold ${getTempColor(weather.temp, unit)}`}>
                                        {weather.temp}{tempUnit}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                                        Feels like {weather.feels_like}{tempUnit}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Raw: {weather.raw_temp} {unit === 'metric' ? '°C' : '°F'}
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="w-24 h-24">
                                        <Image
                                            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                                            alt={weather.description}
                                            width={96}
                                            height={96}
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="text-xl text-gray-700 dark:text-gray-300 capitalize mt-2">
                                {capitalizeFirstLetter(weather.description)}
                            </p>
                        </div>
                    </div>

                    {/* Weather Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className="bg-white/60 dark:bg-gray-800/60 p-5 rounded-2xl card-hover">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <FaThermometerHalf className="text-blue-600 dark:text-blue-400 text-xl" />
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">Pressure</span>
                                    <p className="text-2xl font-bold mt-1">{weather.pressure} hPa</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/60 dark:bg-gray-800/60 p-5 rounded-2xl card-hover">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                                    <FaTint className="text-cyan-600 dark:text-cyan-400 text-xl" />
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">Humidity</span>
                                    <p className="text-2xl font-bold mt-1">{weather.humidity}%</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/60 dark:bg-gray-800/60 p-5 rounded-2xl card-hover">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <FaWind className="text-green-600 dark:text-green-400 text-xl" />
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">Wind</span>
                                    <p className="text-2xl font-bold mt-1">
                                        {formatWindSpeed(weather.wind_speed, unit)}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {getWindDirection(weather.wind_deg)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/60 dark:bg-gray-800/60 p-5 rounded-2xl card-hover">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <FaEye className="text-purple-600 dark:text-purple-400 text-xl" />
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">Visibility</span>
                                    <p className="text-2xl font-bold mt-1">
                                        {formatVisibility(weather.visibility)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                    {/* Sunrise & Sunset */}
                    <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <FaSun className="text-white text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Sunrise</h3>
                                <p className="text-3xl font-bold text-white mt-1">
                                    {formatTime(weather.sunrise, weather.timezone)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-800 p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <FaMoon className="text-white text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Sunset</h3>
                                <p className="text-3xl font-bold text-white mt-1">
                                    {formatTime(weather.sunset, weather.timezone)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Data Debug Info */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                                <FaCloud className="text-gray-600 dark:text-gray-300 text-xl" />
                            </div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Data Information</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Timezone:</span>
                                <span className="font-mono">GMT{weather.timezone >= 0 ? '+' : ''}{weather.timezone / 3600}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Data Time:</span>
                                <span className="font-mono">{new Date(weather.dt * 1000).toLocaleTimeString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Coordinates:</span>
                                <span className="font-mono">{weather.coord.lat.toFixed(2)}°, {weather.coord.lon.toFixed(2)}°</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Debug Information - Only show in development */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <details className="text-sm">
                        <summary className="cursor-pointer text-gray-500 dark:text-gray-400">
                            Debug Information
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto text-xs">
                            {JSON.stringify(weather, null, 2)}
                        </pre>
                    </details>
                </div>
            )}
        </div>
    )
}