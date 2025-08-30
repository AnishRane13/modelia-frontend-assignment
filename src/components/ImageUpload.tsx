import { ChangeEvent, useRef } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (imageDataUrl: string | null) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const downscaleImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()
      
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

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG or JPG)')
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    try {
      const downscaledImage = await downscaleImage(file)
      onImageSelect(downscaledImage)
    } catch (error) {
      console.error('Error processing image:', error)
      alert('Error processing image. Please try again.')
    }
  }

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      const input = fileInputRef.current
      if (input) {
        input.files = event.dataTransfer.files
        await handleFileSelect({ target: { files: event.dataTransfer.files } } as ChangeEvent<HTMLInputElement>)
      }
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ImageIcon className="w-5 h-5" />
        Upload Image
      </h2>
      
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-gray-500">
          PNG, JPG up to 10MB
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Large images will be automatically downscaled to 1920px
        </p>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select image file"
      />
    </div>
  )
}

export default ImageUpload
