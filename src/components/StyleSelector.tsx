import { ChevronDown } from 'lucide-react'

interface StyleSelectorProps {
  value: string
  onChange: (value: string) => void
}

const styles = [
  { value: 'editorial', label: 'Editorial', description: 'Professional magazine-style photography' },
  { value: 'streetwear', label: 'Streetwear', description: 'Urban, fashion-forward aesthetic' },
  { value: 'vintage', label: 'Vintage', description: 'Classic, retro film photography' },
  { value: 'minimalist', label: 'Minimalist', description: 'Clean, simple, focused composition' },
  { value: 'dramatic', label: 'Dramatic', description: 'High contrast, moody lighting' }
]

const StyleSelector: React.FC<StyleSelectorProps> = ({ value, onChange }) => {
  const selectedStyle = styles.find(style => style.value === value)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Style Selection
      </h2>
      
      <div className="space-y-3">
        <label htmlFor="style-select" className="block text-sm font-medium text-gray-700">
          Choose your artistic style
        </label>
        
        <div className="relative">
          <select
            id="style-select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            aria-describedby="style-description"
          >
            {styles.map((style) => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
          
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        
        {selectedStyle && (
          <div id="style-description" className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            <span className="font-medium">{selectedStyle.label}:</span> {selectedStyle.description}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          💡 The style will be applied to your image during AI generation
        </div>
      </div>
    </div>
  )
}

export default StyleSelector
