import { useState, useEffect } from 'react'
import { History, ChevronDown } from 'lucide-react'
import { getHistory } from '../services/historyService'
import { GenerationData } from '../types'

interface GenerationHistoryProps {
  onRestore: (item: GenerationData) => void
}

const GenerationHistory: React.FC<GenerationHistoryProps> = ({ onRestore }) => {
  const [history, setHistory] = useState<GenerationData[]>([])

  useEffect(() => {
    const loadHistory = () => {
      const historyData = getHistory()
      setHistory(historyData)
    }

    loadHistory()

    // Listen for storage changes to update history
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ai_studio_history') {
        loadHistory()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  if (history.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <History className="w-5 h-5 text-white" />
          </div>
          Recent Generations
        </h2>
        <div className="text-center py-8 text-gray-500">
          <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No generations yet</p>
          <p className="text-sm">Your recent creations will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
          <History className="w-5 h-5 text-white" />
        </div>
        Recent Generations
      </h2>
      
      <div className="space-y-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onRestore(item)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 cursor-pointer transition-colors group text-left"
            aria-label={`Restore generation: ${item.prompt}`}
          >
            <img
              src={item.imageUrl}
              alt={`Generated: ${item.prompt}`}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700">
                {item.prompt}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {item.style} • {item.createdAt.toLocaleDateString()}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90 group-hover:text-blue-500" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default GenerationHistory