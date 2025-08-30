import { useState, useEffect } from 'react'
import { History, Clock, Trash2, Sparkles, RotateCcw } from 'lucide-react'
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
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
              <History className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Generation History</h2>
            <p className="text-slate-600 text-sm">Your AI creations archive</p>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-200 rounded-full flex items-center justify-center">
            <History className="w-10 h-10 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium text-lg mb-2">No generations yet</p>
          <p className="text-slate-500 text-sm">Your AI-generated images will appear here</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-full w-fit mx-auto">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>Start creating to build your history</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
              <History className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Generation History</h2>
            <p className="text-slate-600 text-sm">{history.length} AI creations</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 px-3 py-2 rounded-full border border-purple-200 hover:bg-purple-100"
        >
          {isExpanded ? 'Show Less' : 'Show All'}
        </button>
      </div>

      <div className="space-y-4">
        {history.slice(0, isExpanded ? history.length : 3).map((generation) => (
          <div
            key={generation.id}
            className="group relative border-2 border-slate-200 rounded-xl p-4 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 cursor-pointer"
            onClick={() => onRestoreGeneration(generation)}
          >
            <div className="flex items-start gap-4">
              {/* Thumbnail - Now showing the actual generated image */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md border-2 border-slate-200 group-hover:border-purple-300 transition-all duration-300">
                  <img
                    src={generation.imageUrl}
                    alt={`Generated image for: ${generation.prompt}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate leading-relaxed">
                  {generation.prompt}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full capitalize font-medium shadow-sm">
                    {generation.style}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3 text-purple-500" />
                    {formatDate(generation.createdAt)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFromHistory(generation.id)
                  }}
                  className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all duration-200"
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
        <div className="text-center pt-4">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-sm text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 px-4 py-2 rounded-full border border-purple-200 hover:bg-purple-100"
          >
            Show {history.length - 3} more generations
          </button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-full w-fit mx-auto">
          <Sparkles className="w-3 h-3 text-purple-500" />
          <span>Click any generation to restore it in the main interface</span>
        </div>
      </div>
    </div>
  )
}

export default HistoryPanel
