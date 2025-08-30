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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <label htmlFor="prompt-input" className="text-sm font-medium text-slate-700">
          Describe what you want to create:
        </label>
      </div>
      
      <textarea
        id="prompt-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Example: Transform this into a vintage film noir style with dramatic lighting and deep shadows..."
        className="w-full px-4 py-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 bg-white text-slate-700 placeholder-slate-400 font-medium leading-relaxed"
        rows={3}
        aria-describedby="prompt-help"
      />
      
      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
        <MessageSquare className="w-3 h-3 text-blue-500" />
        <span>Be specific about style, mood, lighting, and artistic direction</span>
      </div>
    </div>
  )
}

export default PromptInput