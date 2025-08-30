import { KeyboardEvent } from 'react'
import { MessageSquare } from 'lucide-react'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        Prompt
      </h2>
      
      <div className="space-y-3">
        <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700">
          Describe how you want to transform your image
        </label>
        
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Transform this into a vintage film noir style with dramatic lighting..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
          aria-describedby="prompt-help"
        />
        
        <div id="prompt-help" className="text-xs text-gray-500">
          <p>💡 Be specific about style, mood, lighting, and artistic direction</p>
        </div>
      </div>
    </div>
  )
}

export default PromptInput
