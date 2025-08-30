import { useState, useRef, useCallback } from 'react'
import { Play, Loader2, X } from 'lucide-react'
import { generateImage } from '../services/mockApi'
import { saveToHistory } from '../services/historyService'
import { GenerationRequest, GenerationResponse, ApiError } from '../types'

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
    return Math.min(1000 * Math.pow(2, attempt - 1), 4000)
  }

  const handleGenerate = useCallback(async () => {
    if (isDisabled) return

    setIsGenerating(true)
    setRetryCount(0)
    setCurrentAttempt(1)

    abortControllerRef.current = new AbortController()

    try {
      const request: GenerationRequest = {
        imageDataUrl: imageDataUrl!,
        prompt: prompt.trim(),
        style
      }

      const response = await generateImage(request, abortControllerRef.current.signal)
      
      saveToHistory(response)
      onGenerationComplete(response)
      
      setIsGenerating(false)
      setRetryCount(0)
      setCurrentAttempt(1)
      
    } catch (error) {
      if (error instanceof Error && error.message === 'Request was aborted') {
        setIsGenerating(false)
        setRetryCount(0)
        setCurrentAttempt(1)
        return
      }

      const apiError = error as ApiError
      if (apiError.message === 'Model overloaded' && currentAttempt < 3) {
        const delay = calculateDelay(currentAttempt)
        setRetryCount(prev => prev + 1)
        setCurrentAttempt(prev => prev + 1)
        
        setTimeout(() => {
          if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
            handleGenerate()
          }
        }, delay)
      } else {
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

  if (isGenerating) {
    return (
      <div className="space-y-4" role="region" aria-label="Generation in progress">
        <button
          onClick={handleAbort}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Stop generation process"
          title="Stop generation process"
        >
          <X className="w-5 h-5" aria-hidden="true" />
          Stop Generation
        </button>
        
        <div 
          className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200"
          role="status"
          aria-live="polite"
          aria-label="Generation status"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" aria-hidden="true" />
            <span className="text-slate-800 font-semibold">
              Creating your AI image...
            </span>
          </div>
          
          {retryCount > 0 && (
            <p className="text-sm text-blue-600" aria-live="polite">
              Retrying... (Attempt {currentAttempt}/3)
            </p>
          )}
        </div>
        
        {/* Screen reader status updates */}
        <div className="sr-only" aria-live="polite">
          {retryCount > 0 
            ? `Retry attempt ${currentAttempt} of 3 in progress`
            : 'AI image generation in progress'
          }
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3" role="region" aria-label="Generate AI image">
      <button
        onClick={handleGenerate}
        disabled={isDisabled}
        className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isDisabled
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-[1.02] text-lg'
        }`}
        aria-label={isDisabled ? "Generate AI image (disabled - complete all fields first)" : "Generate AI image"}
        aria-describedby={isDisabled ? "disabled-reason" : "generate-instructions"}
        title={isDisabled ? "Complete all fields to enable generation" : "Click to start AI generation"}
      >
        <Play className="w-6 h-6" aria-hidden="true" />
        <span>Generate AI Image</span>
      </button>
      
      {isDisabled && (
        <p 
          id="disabled-reason"
          className="text-center text-sm text-slate-500"
          role="note"
          aria-label="Why generation is disabled"
        >
          Please upload an image and write a description first
        </p>
      )}
      
      {!isDisabled && (
        <p 
          id="generate-instructions"
          className="text-center text-sm text-slate-500"
          role="note"
          aria-label="Generation instructions"
        >
          Click to start AI generation
        </p>
      )}
      
      {/* Screen reader instructions */}
      <div className="sr-only" aria-live="polite">
        {isDisabled 
          ? "Generate button is disabled. Please upload an image and write a description first."
          : "Generate button is ready. Click to start AI image generation."
        }
      </div>
    </div>
  )
}

export default GenerateButton