import { useEffect, useState } from 'react'
import { X, AlertCircle, CheckCircle, Sparkles } from 'lucide-react'
import { ToastProps } from '../types'

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

  const icon = type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />
  const bgColor = type === 'success' 
    ? 'bg-emerald-50 border-emerald-200' 
    : 'bg-red-50 border-red-200'
  const textColor = type === 'success' ? 'text-emerald-800' : 'text-red-800'
  const iconBg = type === 'success' 
    ? 'bg-gradient-to-br from-emerald-500 to-teal-500' 
    : 'bg-gradient-to-br from-red-500 to-pink-500'

  return (
    <div
      className={`fixed top-6 right-6 z-50 max-w-md w-full transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className={`relative bg-white rounded-2xl shadow-xl p-6 border-2 ${bgColor} overflow-hidden`}>
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className={`p-3 rounded-xl shadow-md ${iconBg}`}>
              {icon}
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className={`text-lg font-bold ${textColor} mb-2`}>
              {type === 'success' ? 'Success! 🎉' : 'Oops! 😅'}
            </p>
            <p className={`text-sm ${textColor} leading-relaxed`}>
              {message}
            </p>
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-2 rounded-lg transition-all duration-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
          <div 
            className={`h-1 rounded-full transition-all duration-1000 ease-linear ${
              type === 'success' 
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400' 
                : 'bg-gradient-to-r from-red-400 to-pink-400'
            }`}
            style={{ 
              width: isVisible ? '100%' : '0%',
              transition: `width ${duration}ms linear`
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Toast