export interface TokenFactoryConfig {
  model: string
  systemPrompt: string
  temperature?: number
  maxTokens?: number
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface TokenFactoryRequest {
  model: string
  messages: ChatMessage[]
  temperature?: number
  max_tokens?: number
}

export interface TokenFactoryChoice {
  index: number
  message: {
    role: string
    content: string
  }
  finish_reason: string
}

export interface TokenFactoryUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface TokenFactoryResponse {
  id: string
  object: string
  created: number
  model: string
  choices: TokenFactoryChoice[]
  usage: TokenFactoryUsage
}

export interface TokenFactoryError {
  error: {
    message: string
    type: string
    code?: string
  }
}

export type TokenFactoryResult = TokenFactoryResponse | TokenFactoryError