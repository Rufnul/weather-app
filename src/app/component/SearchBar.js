'use client'

import { useState } from 'react'
import { FaSearch, FaTimes, FaLocationArrow } from 'react-icons/fa'

export default function SearchBar({ onSearch, disabled }) {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])

    const popularCities = [
        'London', 'New York', 'Tokyo', 'Paris', 'Dubai',
        'Sydney', 'Singapore', 'Berlin', 'Mumbai', 'Shanghai',
        'Toronto', 'Cairo', 'Moscow', 'São Paulo', 'Seoul'
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim() && !disabled) {
            onSearch(query.trim())
            setSuggestions([])
        }
    }

    const clearSearch = () => {
        setQuery('')
        setSuggestions([])
    }

    const handleInputChange = (value) => {
        setQuery(value)
        if (value.trim()) {
            const filtered = popularCities.filter(city =>
                city.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5)
            setSuggestions(filtered)
        } else {
            setSuggestions([])
        }
    }

    const handleSuggestionClick = (city) => {
        setQuery(city)
        onSearch(city)
        setSuggestions([])
    }

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    alert(`Location: ${position.coords.latitude}, ${position.coords.longitude}\n\nNote: Location-based weather feature can be implemented with additional API calls.`)
                },
                (error) => {
                    alert('Unable to retrieve your location. Please search for a city instead.')
                }
            )
        } else {
            alert('Geolocation is not supported by your browser.')
        }
    }

    return (
        <div className="relative w-full">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="Search for a city (e.g., London, Tokyo, New York)..."
                        className="w-full px-6 py-4 pl-14 pr-32 rounded-2xl border-2 border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
                     shadow-lg transition-all duration-300"
                        disabled={disabled}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <FaSearch className="text-gray-400 dark:text-gray-500 text-lg" />
                    </div>

                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-24 top-1/2 transform -translate-y-1/2
                       text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                       transition-colors duration-200 p-2"
                        >
                            <FaTimes />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="absolute right-40 top-1/2 transform -translate-y-1/2
                     text-gray-400 hover:text-blue-500 dark:hover:text-cyan-400
                     transition-colors duration-200 p-2"
                        title="Use current location"
                    >
                        <FaLocationArrow />
                    </button>

                    <button
                        type="submit"
                        disabled={disabled || !query.trim()}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2
                     bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                     disabled:from-gray-300 disabled:to-gray-400 
                     text-white px-6 py-2.5 rounded-xl font-medium
                     transition-all duration-300 hover:shadow-lg hover:scale-105
                     disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        Search
                    </button>
                </div>
            </form>

            {suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 
                      rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 
                      overflow-hidden animate-fade-in">
                    {suggestions.map((city, index) => (
                        <button
                            key={index}
                            onClick={() => handleSuggestionClick(city)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 
                       transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        >
                            <div className="flex items-center">
                                <FaSearch className="text-gray-400 mr-3" size={14} />
                                <span className="text-gray-700 dark:text-gray-300">{city}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Try:</span>
                {popularCities.slice(0, 5).map((city) => (
                    <button
                        key={city}
                        onClick={() => handleSuggestionClick(city)}
                        className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                     dark:hover:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300 
                     transition-colors duration-200"
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    )
}