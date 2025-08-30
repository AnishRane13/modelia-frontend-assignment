import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import ImagePreview from './components/ImagePreview'
import PromptInput from './components/PromptInput'
import StyleSelector from './components/StyleSelector'
import GenerationSummary from './components/GenerationSummary'

export interface GenerationData {
  id: string
  imageUrl: string
  prompt: string
  style: string
  createdAt: Date
}

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('editorial')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎨 AI Studio
          </h1>
          <p className="text-gray-600">
            Transform your images with AI-powered style generation
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Preview */}
          <div className="space-y-6">
            <ImageUpload onImageSelect={setSelectedImage} />
            <ImagePreview imageUrl={selectedImage} />
          </div>

          {/* Right Column - Controls and Summary */}
          <div className="space-y-6">
            <PromptInput value={prompt} onChange={setPrompt} />
            <StyleSelector value={selectedStyle} onChange={setSelectedStyle} />
            <GenerationSummary 
              imageUrl={selectedImage} 
              prompt={prompt} 
              style={selectedStyle} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
