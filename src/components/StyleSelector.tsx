import { Palette } from 'lucide-react'

interface StyleSelectorProps {
  value: string
  onChange: (value: string) => void
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ value, onChange }) => {
  const styles = [
    { id: 'editorial', name: 'Editorial', description: 'Professional magazine style', color: 'bg-blue-500' },
    { id: 'cinematic', name: 'Cinematic', description: 'Movie poster aesthetic', color: 'bg-purple-500' },
    { id: 'vintage', name: 'Vintage', description: 'Retro film photography', color: 'bg-amber-500' },
    { id: 'artistic', name: 'Artistic', description: 'Abstract creative expression', color: 'bg-green-500' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean and simple design', color: 'bg-gray-500' },
    { id: 'fantasy', name: 'Fantasy', description: 'Magical and dreamlike', color: 'bg-indigo-500' }
  ]

  return (
    <div className="space-y-4" role="group" aria-labelledby="style-label">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-purple-500" aria-hidden="true" />
        <label 
          id="style-label"
          className="text-sm font-medium text-slate-700"
        >
          Choose an art style:
        </label>
      </div>
      
      <div 
        className="grid grid-cols-2 gap-3"
        role="radiogroup"
        aria-labelledby="style-label"
        aria-describedby="style-description"
      >
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              value === style.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
            }`}
            role="radio"
            aria-checked={value === style.id}
            aria-describedby={`style-${style.id}-desc`}
            title={`Select ${style.name} style: ${style.description}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${style.color}`} aria-hidden="true"></div>
              <h3 className={`font-semibold text-sm ${
                value === style.id ? 'text-slate-800' : 'text-slate-700'
              }`}>
                {style.name}
              </h3>
            </div>
            <p 
              id={`style-${style.id}-desc`}
              className="text-xs text-slate-500 leading-relaxed"
            >
              {style.description}
            </p>
          </button>
        ))}
      </div>
      
      {/* Screen reader description */}
      <div 
        id="style-description"
        className="sr-only"
        aria-live="polite"
      >
        Style selection grid. Choose from six different artistic styles. 
        Each style creates unique artistic transformations. 
        Currently selected: {styles.find(s => s.id === value)?.name || 'none'}.
      </div>
    </div>
  )
}

export default StyleSelector