import { Image, Eye, Camera } from 'lucide-react'

interface ImagePreviewProps {
  imageUrl: string | null
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  if (!imageUrl) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-md">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Image Preview</h2>
            <p className="text-slate-600 text-sm">See your uploaded image</p>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-12 text-center border-2 border-dashed border-slate-200">
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 bg-slate-200 rounded-full flex items-center justify-center">
              <Image className="w-10 h-10 text-slate-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <Camera className="w-3 h-3 text-white" />
            </div>
          </div>
          <p className="text-slate-600 font-medium">Upload an image to see the preview</p>
          <p className="text-slate-400 text-sm mt-1">Your image will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-md">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Image Preview</h2>
          <p className="text-slate-600 text-sm">Ready for AI transformation</p>
        </div>
      </div>
      
      <div className="relative group">
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <img
            src={imageUrl}
            alt="Uploaded image preview"
            className="w-full h-auto transition-all duration-300 group-hover:scale-[1.01]"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
          
          {/* Image info badge */}
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-2 rounded-full border border-white/20 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium">Original</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePreview