'use client'

import { FaThermometerEmpty, FaThermometerFull, FaSync } from 'react-icons/fa'

export default function TemperatureToggle({ unit, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className="flex items-center justify-between px-6 py-4 rounded-2xl 
               bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
               transition-all duration-300 group shadow-lg hover:shadow-xl w-full md:w-auto"
        >
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <div className="text-3xl transition-all duration-300 group-hover:scale-110">
                        {unit === 'metric' ? (
                            <FaThermometerEmpty className="text-blue-500" />
                        ) : (
                            <FaThermometerFull className="text-orange-500" />
                        )}
                    </div>
                    <div className="absolute -top-1 -right-1 bg-blue-500 dark:bg-cyan-500 rounded-full p-1">
                        <FaSync className="text-white text-xs" />
                    </div>
                </div>
                <div className="text-left">
                    <div className="font-semibold text-gray-800 dark:text-white">
                        Switch to {unit === 'metric' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Currently showing in {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
                    </div>
                </div>
            </div>
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                {unit === 'metric' ? '°C' : '°F'}
            </div>
        </button>
    )
}