export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 
                      border-t-blue-500 dark:border-t-cyan-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse-slow"></div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                    Loading weather data...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Fetching the latest information from OpenWeatherMap
                </p>
            </div>
            <div className="flex space-x-3">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                ))}
            </div>
        </div>
    )
}