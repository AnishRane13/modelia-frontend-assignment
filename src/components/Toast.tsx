import { useEffect, useState } from 'react'
import { X, AlertCircle, CheckCircle } from 'lucide-react'

export interface ToastProps {
  message: string
  type: 'success' | 'error'
  duration?: number
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />
  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800'
  const iconColor = type === 'success' ? 'text-green-600' : 'text-red-600'

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full border rounded-lg shadow-lg p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${bgColor}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${iconColor}`}>
          {icon}
        </div>
        
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>
            {type === 'success' ? 'Success' : 'Error'}
          </p>
          <p className={`text-sm ${textColor} mt-1`}>
            {message}
          </p>
        </div>
        
        <button
          onClick={handleClose}
          className={`flex-shrink-0 p-1 rounded-md hover:bg-opacity-20 transition-colors ${iconColor} hover:bg-current`}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Toast
