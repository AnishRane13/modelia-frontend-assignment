import { Image as ImageIcon } from 'lucide-react'

interface ImagePreviewProps {
  imageUrl: string | null
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  if (!imageUrl) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Image Preview
        </h2>
        <div className="bg-gray-100 rounded-lg p-12 text-center">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            Upload an image to see the preview
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ImageIcon className="w-5 h-5" />
        Image Preview
      </h2>
      <div className="relative">
        <img
          src={imageUrl}
          alt="Uploaded image preview"
          className="w-full h-auto rounded-lg shadow-sm"
          style={{ maxHeight: '400px', objectFit: 'contain' }}
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Preview
        </div>
      </div>
    </div>
  )
}

export default ImagePreview
