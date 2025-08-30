import { useState, useEffect } from 'react'
import { History, Clock, Trash2, Image as ImageIcon } from 'lucide-react'
import { GenerationResponse } from '../services/mockApi'
import { getHistory, removeFromHistory } from '../services/historyService'

interface HistoryPanelProps {
  onRestoreGeneration: (generation: GenerationResponse) => void
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ onRestoreGeneration }) => {
  const [history, setHistory] = useState<GenerationResponse[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Load history from localStorage
    const loadHistory = () => {
      const savedHistory = getHistory()
      setHistory(savedHistory)
    }

    loadHistory()

    // Listen for storage changes (if another tab updates history)
    const handleStorageChange = () => {
      loadHistory()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleRemoveFromHistory = (id: string) => {
    removeFromHistory(id)
    setHistory(prev => prev.filter(item => item.id !== id))
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <History className="w-5 h-5" />
          Generation History
        </h2>
        <div className="text-center py-8">
          <History className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No generations yet</p>
          <p className="text-sm text-gray-400">Your AI-generated images will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <History className="w-5 h-5" />
          Generation History
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Show All'}
        </button>
      </div>

      <div className="space-y-3">
        {history.slice(0, isExpanded ? history.length : 3).map((generation) => (
          <div
            key={generation.id}
            className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer group"
            onClick={() => onRestoreGeneration(generation)}
          >
            <div className="flex items-start gap-3">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0">
                <img
                  src={generation.imageUrl}
                  alt={`Generated image for: ${generation.prompt}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-md flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {generation.prompt}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                    {generation.style}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {formatDate(generation.createdAt)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFromHistory(generation.id)
                  }}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {history.length > 3 && !isExpanded && (
        <div className="text-center pt-3">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Show {history.length - 3} more generations
          </button>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          💡 Click any generation to restore it in the main interface
        </p>
      </div>
    </div>
  )
}

export default HistoryPanel
