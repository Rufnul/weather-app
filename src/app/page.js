'use client'

import { useState, useEffect } from 'react'
import SearchBar from './component/SearchBar'
import WeatherCard from './component/WeatherCard'
import WorldWeatherGrid from './component/WorldWeatherGrid'
import LoadingSpinner from './component/LoadingSpinner'
import TemperatureToggle from './component/TempratureToggle'
import { getWeather } from '@/lib/weatherService'

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState('metric')
  const [recentSearches, setRecentSearches] = useState([])

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentWeatherSearches')
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }

    // Load default city on first render
    if (!weatherData && !loading && !error) {
      handleSearch('London')
    }
  }, [])

  const saveToRecentSearches = (city, country) => {
    const newSearch = { city, country, timestamp: new Date().toISOString() }
    const updatedSearches = [newSearch, ...recentSearches.filter(s => s.city !== city)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentWeatherSearches', JSON.stringify(updatedSearches))
  }

  const handleSearch = async (city) => {
    if (!city || city.trim() === '') {
      setError('Please enter a city name')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await getWeather(city, unit)
      setWeatherData(data)
      saveToRecentSearches(data.name, data.country)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleRecentSearch = (city) => {
    handleSearch(city)
  }

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric'
    setUnit(newUnit)
  }

  useEffect(() => {
    // Refresh current weather when unit changes
    if (weatherData && !loading) {
      handleSearch(weatherData.name)
    }
  }, [unit])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3">
            Global Weather Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Get real-time weather information for any city worldwide
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="w-full md:w-2/3">
            <SearchBar onSearch={handleSearch} disabled={loading} />
          </div>
          <div className="w-full md:w-auto">
            <TemperatureToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </div>

        {recentSearches.length > 0 && !weatherData && !loading && (
          <div className="bg-white/50 dark:bg-gray-800/30 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearch(search.city)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {search.city}, {search.country}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col justify-center items-center h-64">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Fetching weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-300 text-xl">!</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                  Unable to Load Weather Data
                </h3>
                <p className="text-red-700 dark:text-red-400 mt-1">{error}</p>
                
                <div className="mt-4">
                  <button
                    onClick={() => handleSearch('London')}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    Test with London
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {weatherData && !loading && !error && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Current Weather in {weatherData.name}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <WeatherCard weather={weatherData} unit={unit} />
          </div>
        )}

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              🌍 World Weather Overview
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing temperatures in {unit === 'metric' ? '°C' : '°F'}
            </span>
          </div>
          <WorldWeatherGrid unit={unit} />
        </div>
      </div>
    </div>
  )
}