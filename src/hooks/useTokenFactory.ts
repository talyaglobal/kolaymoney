import { useState, useCallback } from 'react'
import { createTokenFactoryCompletion } from '../lib/nebius/client'
import type { TokenFactoryRequest, TokenFactoryResponse } from '../types/nebius'

interface UseTokenFactoryResult {
  isLoading: boolean
  error: string | null
  response: TokenFactoryResponse | null
  generateCompletion: (request: Omit<TokenFactoryRequest, 'model'> & { model?: string }) => Promise<void>
  clearError: () => void
}

export const useTokenFactory = (defaultModel = 'gpt-3.5-turbo'): UseTokenFactoryResult => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<TokenFactoryResponse | null>(null)

  const generateCompletion = useCallback(async (
    request: Omit<TokenFactoryRequest, 'model'> & { model?: string }
  ) => {
    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const completionRequest: TokenFactoryRequest = {
        model: request.model || defaultModel,
        messages: request.messages,
        temperature: request.temperature,
        max_tokens: request.max_tokens,
      }

      const result = await createTokenFactoryCompletion(completionRequest)
      setResponse(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [defaultModel])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isLoading,
    error,
    response,
    generateCompletion,
    clearError,
  }
}