import { Inter } from 'next/font/google'
import './globals.css'
import ThemeToggle from './component/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WeatherSphere - Global Weather Dashboard',
  description: 'Real-time weather information for cities worldwide',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} gradient-bg min-h-screen text-gray-800 dark:text-gray-200`}>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 glass-effect shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">W</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                      WeatherSphere
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Global Weather Dashboard
                    </p>
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="mt-auto py-6 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Powered by <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 font-medium">OpenWeatherMap API</a> • Built with Next.js 14
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Data updates every 10 minutes • {new Date().getFullYear()} WeatherSphere
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}