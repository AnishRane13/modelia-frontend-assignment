import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import PromptInput from './components/PromptInput'
import StyleSelector from './components/StyleSelector'
import GenerateButton from './components/GenerateButton'
import HistoryPanel from './components/HistoryPanel'
import Toast from './components/Toast'
import { GenerationResponse } from './types'

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('editorial')
  const [generatedImage, setGeneratedImage] = useState<GenerationResponse | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleGenerationComplete = (generation: GenerationResponse) => {
    setGeneratedImage(generation)
    setToast({ message: 'Image generated successfully!', type: 'success' })
    
    // Clear the form fields after successful generation
    setSelectedImage(null)
    setPrompt('')
    setSelectedStyle('editorial')
  }

  const handleGenerationError = (error: string) => {
    setToast({ message: error, type: 'error' })
  }

  const handleRestoreGeneration = (generation: GenerationResponse) => {
    setSelectedImage(generation.imageUrl)
    setPrompt(generation.prompt)
    setSelectedStyle(generation.style)
    setGeneratedImage(null)
    setToast({ message: 'Generation restored from history', type: 'success' })
  }

  const closeToast = () => {
    setToast(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Simple Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            AI Image Studio
          </h1>
          <p className="text-slate-600">
            Transform your photos with AI in 3 simple steps
          </p>
        </header>

        {/* Step-by-Step Workflow */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Upload Image */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-xl font-semibold text-slate-800">Upload Your Photo</h2>
            </div>
            <ImageUpload onImageSelect={setSelectedImage} />
          </div>

          {/* Step 2: Describe & Style - Only show if image is uploaded */}
          {selectedImage && (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">Describe Your Vision</h2>
                </div>
                <PromptInput value={prompt} onChange={setPrompt} />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">Choose Style & Generate</h2>
                </div>
                <StyleSelector value={selectedStyle} onChange={setSelectedStyle} />
                
                {/* Generate Button - Big and prominent */}
                <div className="mt-6">
                  <GenerateButton
                    imageDataUrl={selectedImage}
                    prompt={prompt}
                    style={selectedStyle}
                    onGenerationComplete={handleGenerationComplete}
                    onError={handleGenerationError}
                  />
                </div>
              </div>
            </>
          )}

          {/* Generated Result - Full width display */}
          {generatedImage && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  🎉 Your AI Image is Ready!
                </h2>
                <p className="text-slate-600 mb-4">
                  "{generatedImage.prompt}"
                </p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full capitalize">
                    {generatedImage.style}
                  </span>
                  <span className="text-slate-500">
                    {generatedImage.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="max-w-2xl mx-auto mb-6">
                <img
                  src={generatedImage.imageUrl}
                  alt={`AI generated: ${generatedImage.prompt}`}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={() => setGeneratedImage(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg transition-colors"
                >
                  Create Another Image
                </button>
              </div>
            </div>
          )}

          {/* History Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Your Previous Creations</h2>
            </div>
            <HistoryPanel onRestoreGeneration={handleRestoreGeneration} />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  )
}

export default App