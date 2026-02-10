/**
 * QuestionRenderer - Renders different question types dynamically
 */

import { SectorQuestion } from '@/types/compliance'

interface QuestionRendererProps {
  question: SectorQuestion
  value: any
  onChange: (value: any) => void
  error?: string
}

export function QuestionRenderer({ question, value, onChange, error }: QuestionRendererProps) {
  const renderInput = () => {
    switch (question.questionType) {
      case 'single_choice':
      case 'yes_no':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label
                key={option.id}
                className={`
                  block p-4 border-4 cursor-pointer transition-all
                  ${value === option.id 
                    ? 'border-black bg-yellow-300' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                  }
                `}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={value === option.id}
                  onChange={(e) => onChange(e.target.value)}
                  className="mr-3"
                />
                <span className="font-bold">{option.label}</span>
                {option.score !== undefined && (
                  <span className="ml-2 text-sm text-gray-600">
                    ({option.score} puan)
                  </span>
                )}
              </label>
            ))}
          </div>
        )

      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => {
              const isChecked = Array.isArray(value) && value.includes(option.id)
              return (
                <label
                  key={option.id}
                  className={`
                    block p-4 border-4 cursor-pointer transition-all
                    ${isChecked 
                      ? 'border-black bg-yellow-300' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    value={option.id}
                    checked={isChecked}
                    onChange={(e) => {
                      const currentValues = Array.isArray(value) ? value : []
                      if (e.target.checked) {
                        onChange([...currentValues, option.id])
                      } else {
                        onChange(currentValues.filter((v: string) => v !== option.id))
                      }
                    }}
                    className="mr-3"
                  />
                  <span className="font-bold">{option.label}</span>
                  {option.score !== undefined && (
                    <span className="ml-2 text-sm text-gray-600">
                      ({option.score} puan)
                    </span>
                  )}
                </label>
              )
            })}
          </div>
        )

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            placeholder={question.placeholder}
            min={question.validationRules?.min}
            max={question.validationRules?.max}
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
          />
        )

      case 'text':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600 resize-none"
          />
        )

      default:
        return <div className="text-red-600">Geçersiz soru tipi</div>
    }
  }

  return (
    <div className="brutalist-card p-6 bg-white">
      {/* Question Text */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">
          {question.questionText}
          {question.isRequired && <span className="text-red-600 ml-1">*</span>}
        </h3>
        {question.helpText && (
          <p className="text-sm text-gray-600 mb-3">{question.helpText}</p>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="px-2 py-1 bg-gray-100 border-2 border-gray-300">
            {question.category === 'financial' && '💰 Finansal'}
            {question.category === 'operational' && '⚙️ Operasyonel'}
            {question.category === 'legal' && '⚖️ Yasal'}
            {question.category === 'experience' && '📊 Deneyim'}
          </span>
          <span className="px-2 py-1 bg-blue-50 border-2 border-blue-300 font-bold">
            Ağırlık: {question.weight}/10
          </span>
        </div>
      </div>

      {/* Input */}
      {renderInput()}

      {/* Error */}
      {error && (
        <div className="mt-3 p-3 bg-red-100 border-4 border-red-600 text-red-800 font-bold">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}
