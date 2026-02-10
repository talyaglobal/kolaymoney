/**
 * ScoreDisplay - Large compliance score display with pass/fail indicator
 */

import { ComplianceScoring } from '@/types/compliance'
import { CategoryScoreCard } from './CategoryScoreCard'
import { getScoreMessage } from '@/lib/compliance/scoringEngine'

interface ScoreDisplayProps {
  scoring: ComplianceScoring
  showDetails?: boolean
}

export function ScoreDisplay({ scoring, showDetails = true }: ScoreDisplayProps) {
  const message = getScoreMessage(scoring.totalScore)
  
  const getScoreColorClass = () => {
    if (scoring.totalScore >= 70) return 'text-green-600 border-green-600 bg-green-50'
    if (scoring.totalScore >= 60) return 'text-yellow-600 border-yellow-600 bg-yellow-50'
    return 'text-red-600 border-red-600 bg-red-50'
  }

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <div className={`brutalist-card p-8 text-center ${getScoreColorClass()}`}>
        <div className="text-6xl font-bold mb-2">
          {Math.round(scoring.totalScore)}
        </div>
        <div className="text-2xl font-bold mb-4">
          / 100 PUAN
        </div>
        
        {/* Pass/Fail Indicator */}
        <div className={`
          inline-block px-6 py-3 border-4 font-bold text-xl
          ${scoring.isPassed 
            ? 'bg-green-500 border-green-700 text-white' 
            : 'bg-red-500 border-red-700 text-white'
          }
        `}>
          {scoring.isPassed ? '✓ UYGUN' : '✗ UYGUN DEĞİL'}
        </div>

        {/* Message */}
        <div className="mt-6 p-4 bg-white border-4 border-black">
          <div className="font-bold text-lg mb-2">{message.title}</div>
          <div className="text-sm">{message.message}</div>
        </div>
      </div>

      {/* Category Breakdown */}
      {showDetails && (
        <div>
          <h3 className="text-2xl font-bold mb-4">Kategori Detayları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(scoring.categoryScores).map(([category, score]) => (
              <CategoryScoreCard
                key={category}
                category={category as any}
                score={score.earned}
                maxScore={score.max}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {scoring.recommendations.length > 0 && (
        <div className="brutalist-card p-6 bg-blue-50">
          <h3 className="text-xl font-bold mb-4">💡 Öneriler</h3>
          <ul className="space-y-2">
            {scoring.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Failed Criteria */}
      {scoring.failedCriteria.length > 0 && (
        <div className="brutalist-card p-6 bg-red-50 border-red-600">
          <h3 className="text-xl font-bold mb-4 text-red-800">⚠️ Kritik Eksiklikler</h3>
          <ul className="space-y-2">
            {scoring.failedCriteria.map((criteria, idx) => (
              <li key={idx} className="flex items-start gap-2 text-red-800">
                <span className="font-bold">✗</span>
                <span>{criteria}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
