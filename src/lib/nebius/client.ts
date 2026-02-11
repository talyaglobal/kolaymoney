import OpenAI from 'openai'
import type { TokenFactoryRequest, TokenFactoryResponse } from '../../types/nebius'

const nebiusApiKey = import.meta.env.VITE_NEBIUS_API_KEY

if (!nebiusApiKey) {
  console.warn('VITE_NEBIUS_API_KEY not found. Nebius Token Factory will not work.')
}

export const nebiusClient = nebiusApiKey ? new OpenAI({
  baseURL: 'https://api.tokenfactory.nebius.com/v1/',
  apiKey: nebiusApiKey,
  dangerouslyAllowBrowser: true, // Required for client-side usage
}) : null

export const createTokenFactoryCompletion = async (
  request: TokenFactoryRequest
): Promise<TokenFactoryResponse> => {
  if (!nebiusClient) {
    throw new Error('Nebius client not initialized. Check VITE_NEBIUS_API_KEY environment variable.')
  }

  try {
    const response = await nebiusClient.chat.completions.create(request)
    return response as TokenFactoryResponse
  } catch (error) {
    console.error('Nebius API error:', error)
    throw new Error(`Token factory request failed: ${error}`)
  }
}

export const isNebiusEnabled = (): boolean => {
  return nebiusClient !== null
}