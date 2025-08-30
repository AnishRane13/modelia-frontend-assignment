import { useState } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (imageDataUrl: string | null) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const downscaleImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new window.Image()
      
      img.onload = () => {
        const maxSize = 1920
        let { width, height } = img
        
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height * maxSize) / width
            width = maxSize
          } else {
            width = (width * maxSize) / height
            height = maxSize
          }
        }
        
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG or JPG)')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    try {
      const downscaledImage = await downscaleImage(file)
      setSelectedImage(downscaledImage)
      onImageSelect(downscaledImage)
    } catch (error) {
      console.error('Error processing image:', error)
      alert('Error processing image. Please try again.')
    }
  }

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    if (file) {
      await handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) handleFileSelect(file)
    }
    input.click()
  }

  const removeImage = () => {
    setSelectedImage(null)
    onImageSelect(null)
  }

  if (selectedImage) {
    return (
      <div className="text-center" role="region" aria-label="Selected image preview">
        <div className="relative inline-block">
          <img
            src={selectedImage}
            alt="Selected image for AI transformation"
            className="max-w-full h-32 object-cover rounded-lg shadow-md"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Remove selected image"
            title="Remove selected image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-slate-600 mt-2" id="image-status">
          Image selected! Now describe what you want to create.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center" role="region" aria-label="Image upload area">
      <div
        className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isDragging 
            ? 'border-blue-400 bg-blue-50 scale-[1.02]' 
            : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Upload image file by clicking or dragging and dropping"
        aria-describedby="upload-instructions"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
      >
        <div className="mb-4">
          <div className={`w-16 h-16 mx-auto transition-all duration-300 ${
            isDragging ? 'scale-110' : ''
          }`}>
            <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
              isDragging 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-slate-100 text-slate-400'
            }`}>
              <Upload className="w-8 h-8" aria-hidden="true" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2" id="upload-instructions">
          <p className="text-lg text-slate-700 font-medium">
            <span className="text-blue-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-slate-500">PNG, JPG up to 10MB</p>
        </div>
      </div>
      
      {/* Screen reader instructions */}
      <div className="sr-only" aria-live="polite">
        Image upload area. Click to select a file or drag and drop an image here. 
        Supported formats: PNG and JPG. Maximum file size: 10MB.
      </div>
    </div>
  )
}

export default ImageUpload