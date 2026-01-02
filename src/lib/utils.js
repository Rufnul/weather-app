export function formatTime(timestamp, timezone) {
    // Convert timestamp from seconds to milliseconds and add timezone offset
    const date = new Date((timestamp + timezone) * 1000)
    return date.toUTCString().split(' ')[4].slice(0, 5) // HH:MM format
}

export function formatDate(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    }
    return date.toLocaleDateString('en-US', options)
}

export function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatVisibility(meters) {
    if (meters >= 10000) return '10+ km'
    return `${(meters / 1000).toFixed(1)} km`
}

export function convertTemp(temp, fromUnit, toUnit) {
    if (fromUnit === toUnit) return temp

    if (fromUnit === 'metric' && toUnit === 'imperial') {
        return Math.round((temp * 9 / 5) + 32)
    } else if (fromUnit === 'imperial' && toUnit === 'metric') {
        return Math.round((temp - 32) * 5 / 9)
    }

    return temp
}

export function getTempColor(temp, unit) {
    const tempInCelsius = unit === 'imperial' ? (temp - 32) * 5 / 9 : temp

    if (tempInCelsius >= 30) return 'text-red-600'
    if (tempInCelsius >= 25) return 'text-orange-500'
    if (tempInCelsius >= 20) return 'text-yellow-500'
    if (tempInCelsius >= 15) return 'text-green-500'
    if (tempInCelsius >= 10) return 'text-blue-400'
    if (tempInCelsius >= 0) return 'text-blue-500'
    return 'text-blue-600'
}

export function formatWindSpeed(speed, unit) {
    if (unit === 'metric') {
        return `${speed.toFixed(1)} m/s`
    } else {
        return `${(speed * 2.237).toFixed(1)} mph`
    }
}