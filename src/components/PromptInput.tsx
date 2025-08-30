import { KeyboardEvent } from 'react'
import { MessageSquare, Lightbulb } from 'lucide-react'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      console.log('Ctrl+Enter pressed - generation will be handled by GenerateButton')
    }
  }

  return (
    <div className="space-y-4" role="group" aria-labelledby="prompt-label">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" aria-hidden="true" />
        <label 
          htmlFor="prompt-input" 
          id="prompt-label"
          className="text-sm font-medium text-slate-700"
        >
          Describe what you want to create:
        </label>
      </div>
      
      <div className="relative">
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Example: Transform this into a vintage film noir style with dramatic lighting and deep shadows..."
          className="w-full px-4 py-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 bg-white text-slate-700 placeholder-slate-400 font-medium leading-relaxed"
          rows={3}
          aria-describedby="prompt-help prompt-shortcut"
          aria-required="true"
          aria-invalid={value.trim().length === 0}
        />
      </div>
      
      <div 
        className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg"
        id="prompt-help"
        role="note"
        aria-label="Prompt writing tips"
      >
        <MessageSquare className="w-3 h-3 text-blue-500" aria-hidden="true" />
        <span>Be specific about style, mood, lighting, and artistic direction</span>
      </div>
      
      {/* Keyboard shortcut hint */}
      <div 
        className="flex items-center gap-2 text-xs text-slate-400"
        id="prompt-shortcut"
        role="note"
        aria-label="Keyboard shortcut information"
      >
        <div className="px-2 py-1 bg-slate-100 rounded border border-slate-200">
          Ctrl + Enter
        </div>
        <span>to generate (when ready)</span>
      </div>
      
      {/* Screen reader instructions */}
      <div className="sr-only" aria-live="polite">
        Prompt input field. Describe your artistic vision for the AI transformation. 
        Be specific about style, mood, lighting, and artistic direction. 
        Use Ctrl + Enter to generate when ready.
      </div>
    </div>
  )
}

export default PromptInput