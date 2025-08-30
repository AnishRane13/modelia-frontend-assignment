import { Image as ImageIcon, MessageSquare, Palette } from 'lucide-react'

interface GenerationSummaryProps {
  imageUrl: string | null
  prompt: string
  style: string
}

const GenerationSummary: React.FC<GenerationSummaryProps> = ({ imageUrl, prompt, style }) => {
  const isComplete = imageUrl && prompt.trim() && style

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Generation Summary
      </h2>
      
      <div className="space-y-4">
        {/* Image Status */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${imageUrl ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            {imageUrl ? '✓' : '○'}
          </div>
          <div>
            <p className="font-medium text-gray-900">Image Uploaded</p>
            <p className="text-sm text-gray-500">
              {imageUrl ? 'Ready for processing' : 'No image selected'}
            </p>
          </div>
        </div>

        {/* Prompt Status */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${prompt.trim() ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            {prompt.trim() ? '✓' : '○'}
          </div>
          <div>
            <p className="font-medium text-gray-900">Prompt</p>
            <p className="text-sm text-gray-500">
              {prompt.trim() ? prompt : 'No prompt entered'}
            </p>
          </div>
        </div>

        {/* Style Status */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${style ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            {style ? '✓' : '○'}
          </div>
          <div>
            <p className="font-medium text-gray-900">Style</p>
            <p className="text-sm text-gray-500 capitalize">
              {style || 'No style selected'}
            </p>
          </div>
        </div>

        {/* Generation Status */}
        <div className="border-t pt-4">
          <div className={`text-center p-4 rounded-lg ${isComplete ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
            {isComplete ? (
              <div>
                <p className="font-medium text-green-900 mb-2">Ready to Generate! 🎨</p>
                <p className="text-sm text-green-700">
                  All requirements met. Click the Generate button below to create your AI image!

                </p>
              </div>
            ) : (
              <div>
                <p className="font-medium text-gray-900 mb-2">Complete the Setup</p>
                <p className="text-sm text-gray-600">
                  Upload an image, enter a prompt, and select a style to continue
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerationSummary
