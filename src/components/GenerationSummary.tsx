import { CheckCircle, Circle, Sparkles } from 'lucide-react'

interface GenerationSummaryProps {
  imageUrl: string | null
  prompt: string
  style: string
}

const GenerationSummary: React.FC<GenerationSummaryProps> = ({ imageUrl, prompt, style }) => {
  const isComplete = imageUrl && prompt.trim() && style

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className={`p-3 rounded-xl shadow-md transition-all duration-300 ${
            isComplete 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
              : 'bg-gradient-to-br from-slate-500 to-gray-600'
          }`}>
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Generation Summary</h2>
          <p className="text-slate-600 text-sm">Review your setup before generating</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Image Status */}
        <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
          imageUrl 
            ? 'border-emerald-500/50 bg-emerald-50' 
            : 'border-slate-200 bg-slate-50'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            imageUrl 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md' 
              : 'bg-slate-200 border border-slate-300'
          }`}>
            {imageUrl ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <Circle className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="flex-1">
            <p className={`font-semibold text-sm ${
              imageUrl ? 'text-slate-800' : 'text-slate-600'
            }`}>
              Image Uploaded
            </p>
            <p className="text-xs text-slate-500">
              {imageUrl ? 'Ready for processing' : 'No image selected'}
            </p>
          </div>
          {imageUrl && (
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Prompt Status */}
        <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
          prompt.trim() 
            ? 'border-emerald-500/50 bg-emerald-50' 
            : 'border-slate-200 bg-slate-50'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            prompt.trim() 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md' 
              : 'bg-slate-200 border border-slate-300'
          }`}>
            {prompt.trim() ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <Circle className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="flex-1">
            <p className={`font-semibold text-sm ${
              prompt.trim() ? 'text-slate-800' : 'text-slate-600'
            }`}>
              Creative Prompt
            </p>
            <p className="text-xs text-slate-500 truncate max-w-32">
              {prompt.trim() ? prompt : 'No prompt entered'}
            </p>
          </div>
          {prompt.trim() && (
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Style Status */}
        <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
          style 
            ? 'border-emerald-500/50 bg-emerald-50' 
            : 'border-slate-200 bg-slate-50'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            style 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md' 
              : 'bg-slate-200 border border-slate-300'
          }`}>
            {style ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <Circle className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="flex-1">
            <p className={`font-semibold text-sm ${
              style ? 'text-slate-800' : 'text-slate-600'
            }`}>
              Art Style
            </p>
            <p className="text-xs text-slate-500 capitalize">
              {style || 'No style selected'}
            </p>
          </div>
          {style && (
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Generation Status */}
        <div className="border-t border-slate-200 pt-6">
          <div className={`text-center p-6 rounded-xl border-2 transition-all duration-500 ${
            isComplete 
              ? 'border-emerald-500/50 bg-emerald-50' 
              : 'border-slate-200 bg-slate-50'
          }`}>
            {isComplete ? (
<<<<<<< HEAD
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <p className="text-slate-800 font-bold text-lg mb-2">Ready to Generate! 🎨</p>
                  <p className="text-emerald-700 text-sm leading-relaxed">
                    All requirements met. Click the Generate button below to create your AI image!
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-emerald-600 bg-emerald-100 px-3 py-2 rounded-full w-fit mx-auto">
                  <Sparkles className="w-3 h-3" />
                  <span>All systems ready</span>
                </div>
=======
              <div>
                <p className="font-medium text-green-900 mb-2">Ready to Generate! 🎨</p>
                <p className="text-sm text-green-700">
                  All requirements met. Click the Generate button below to create your AI image!

                </p>
>>>>>>> 4f52f32d145b2c9817dbb90c22c506d243e90189
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-slate-200 rounded-full flex items-center justify-center border-2 border-slate-300">
                  <span className="text-2xl">⚙️</span>
                </div>
                <div>
                  <p className="text-slate-700 font-bold text-lg mb-2">Complete the Setup</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Upload an image, enter a prompt, and select a style to continue
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-full w-fit mx-auto">
                  <Circle className="w-3 h-3" />
                  <span>Setup incomplete</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerationSummary
