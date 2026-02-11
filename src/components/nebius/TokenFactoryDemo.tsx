import React, { useState } from 'react'
import { useTokenFactory } from '../../hooks/useTokenFactory'
import { isNebiusEnabled } from '../../lib/nebius/client'

const TokenFactoryDemo: React.FC = () => {
  const [userInput, setUserInput] = useState('')
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant.')
  const { isLoading, error, response, generateCompletion, clearError } = useTokenFactory()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    await generateCompletion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userInput },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })
  }

  if (!isNebiusEnabled()) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-xl font-semibold text-yellow-800 mb-2">
          Nebius Token Factory Demo
        </h2>
        <p className="text-yellow-700">
          Nebius Token Factory is not enabled. Please set the <code>VITE_NEBIUS_API_KEY</code> environment variable.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Nebius Token Factory Demo
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="system-prompt" className="block text-sm font-medium text-gray-700 mb-2">
              System Prompt
            </label>
            <textarea
              id="system-prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter system prompt..."
            />
          </div>

          <div>
            <label htmlFor="user-input" className="block text-sm font-medium text-gray-700 mb-2">
              User Message
            </label>
            <textarea
              id="user-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your message..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            {isLoading ? 'Generating...' : 'Generate Response'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="ml-3 text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {response && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Response</h3>
            
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="whitespace-pre-wrap text-gray-800">
                {response.choices[0]?.message?.content}
              </div>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p><strong>Model:</strong> {response.model}</p>
              <p><strong>Tokens:</strong> {response.usage.total_tokens} (prompt: {response.usage.prompt_tokens}, completion: {response.usage.completion_tokens})</p>
              <p><strong>Finish reason:</strong> {response.choices[0]?.finish_reason}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TokenFactoryDemo