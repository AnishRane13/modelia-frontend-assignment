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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-purple-500" />
        <label className="text-sm font-medium text-slate-700">
          Choose an art style:
        </label>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              value === style.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${style.color}`}></div>
              <h3 className={`font-semibold text-sm ${
                value === style.id ? 'text-slate-800' : 'text-slate-700'
              }`}>
                {style.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {style.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StyleSelector