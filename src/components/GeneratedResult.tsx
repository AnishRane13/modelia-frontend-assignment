import { Sparkles } from 'lucide-react'
import { GenerationResponse } from '../types'

interface GeneratedResultProps {
  generation: GenerationResponse
}

const GeneratedResult: React.FC<GeneratedResultProps> = ({ generation }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        Generated Result
      </h2>
      
      <div className="relative group">
        <img
          src={generation.imageUrl}
          alt={`Generated: ${generation.prompt}`}
          className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ maxHeight: '600px', objectFit: 'contain' }}
        />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-3 py-1 rounded-full shadow-lg">
          ✨ AI Generated
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Style Applied</h3>
            <p className="text-lg font-semibold text-gray-900 capitalize">{generation.style}</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Generated On</h3>
            <p className="text-lg font-semibold text-gray-900">
              {generation.createdAt.toLocaleDateString()} at {generation.createdAt.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Creative Prompt</h3>
          <p className="text-gray-900 leading-relaxed">{generation.prompt}</p>
        </div>
      </div>
    </div>
  )
}

export default GeneratedResult