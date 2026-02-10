/**
 * CategoryScoreCard - Shows individual category score
 */

interface CategoryScoreCardProps {
  category: 'financial' | 'operational' | 'legal' | 'experience'
  score: number
  maxScore: number
}

export function CategoryScoreCard({ category, score, maxScore }: CategoryScoreCardProps) {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
  
  const categoryInfo = {
    financial: { icon: '💰', label: 'Finansal', color: 'blue' },
    operational: { icon: '⚙️', label: 'Operasyonel', color: 'green' },
    legal: { icon: '⚖️', label: 'Yasal', color: 'purple' },
    experience: { icon: '📊', label: 'Deneyim', color: 'orange' }
  }

  const info = categoryInfo[category]
  
  const getColorClasses = () => {
    if (percentage >= 70) return 'bg-green-500 border-green-700'
    if (percentage >= 50) return 'bg-yellow-500 border-yellow-700'
    return 'bg-red-500 border-red-700'
  }

  return (
    <div className="brutalist-card p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{info.icon}</span>
          <span className="font-bold text-lg">{info.label}</span>
        </div>
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative h-6 border-4 border-black bg-gray-100">
        <div
          className={`h-full transition-all duration-500 border-r-4 ${getColorClasses()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="mt-2 text-sm text-gray-600 font-mono">
        {score.toFixed(1)} / {maxScore.toFixed(1)} puan
      </div>
    </div>
  )
}
