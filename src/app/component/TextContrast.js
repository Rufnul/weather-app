'use client'

// This component ensures text has proper contrast
export default function TextContrast({ children, className = '' }) {
    return (
        <div className={`text-gray-800 dark:text-gray-200 ${className}`}>
            {children}
        </div>
    )
}
