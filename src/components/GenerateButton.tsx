import { useState, useRef, useCallback } from 'react'
import { Play, Loader2, X, RefreshCw } from 'lucide-react'
import { generateImage, GenerationRequest, GenerationResponse, ApiError } from '../services/mockApi'
import { saveToHistory } from '../services/historyService'

interface GenerateButtonProps {
  imageDataUrl: string | null
  prompt: string
  style: string
  onGenerationComplete: (generation: GenerationResponse) => void
  onError: (error: string) => void
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  imageDataUrl,
  prompt,
  style,
  onGenerationComplete,
  onError
}) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [currentAttempt, setCurrentAttempt] = useState(1)
  const abortControllerRef = useRef<AbortController | null>(null)

  const isDisabled = !imageDataUrl || !prompt.trim() || isGenerating

  const calculateDelay = (attempt: number): number => {
    // Exponential backoff: 1s, 2s, 4s
    return Math.min(1000 * Math.pow(2, attempt - 1), 4000)
  }

  const handleGenerate = useCallback(async () => {
    if (isDisabled) return

    setIsGenerating(true)
    setRetryCount(0)
    setCurrentAttempt(1)

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    try {
      const request: GenerationRequest = {
        imageDataUrl: imageDataUrl!,
        prompt: prompt.trim(),
        style
      }

      const response = await generateImage(request, abortControllerRef.current.signal)
      
      // Success! Save to history and notify parent
      saveToHistory(response)
      onGenerationComplete(response)
      
      // Reset state
      setIsGenerating(false)
      setRetryCount(0)
      setCurrentAttempt(1)
      
    } catch (error) {
      if (error instanceof Error && error.message === 'Request was aborted') {
        // Request was aborted by user
        setIsGenerating(false)
        setRetryCount(0)
        setCurrentAttempt(1)
        return
      }

      // Handle API errors
      const apiError = error as ApiError
      if (apiError.message === 'Model overloaded' && currentAttempt < 3) {
        // Retry with exponential backoff
        const delay = calculateDelay(currentAttempt)
        setRetryCount(prev => prev + 1)
        setCurrentAttempt(prev => prev + 1)
        
        setTimeout(() => {
          if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
            handleGenerate()
          }
        }, delay)
      } else {
        // Max retries reached or other error
        setIsGenerating(false)
        setRetryCount(0)
        setCurrentAttempt(1)
        onError(apiError.message || 'Generation failed')
      }
    }
  }, [imageDataUrl, prompt, style, isDisabled, currentAttempt, onGenerationComplete, onError])

  const handleAbort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }

  const handleRetry = () => {
    setRetryCount(0)
    setCurrentAttempt(1)
    handleGenerate()
  }

  if (isGenerating) {
    return (
      <div className="space-y-3">
        <button
          onClick={handleAbort}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-5 h-5" />
          Abort Generation
        </button>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span className="text-blue-600 font-medium">
              Generating... {retryCount > 0 && `(Retry ${retryCount}/3)`}
            </span>
          </div>
          
          {retryCount > 0 && (
            <p className="text-sm text-gray-600">
              Attempt {currentAttempt}/3 - Retrying in {calculateDelay(currentAttempt) / 1000}s...
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleGenerate}
        disabled={isDisabled}
        className={`w-full font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
          isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        <Play className="w-5 h-5" />
        Generate AI Image
      </button>
      
      {retryCount > 0 && (
        <button
          onClick={handleRetry}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Retry Generation
        </button>
      )}
      
      <p className="text-xs text-gray-500 text-center">
        {isDisabled ? 'Complete all fields to generate' : 'Click to start AI generation'}
      </p>
    </div>
  )
}

export default GenerateButton
