import { createTokenFactoryCompletion } from './client'
import type { ChatMessage, TokenFactoryRequest, TokenFactoryResponse } from '../../types/nebius'

export class TokenFactory {
  private defaultModel: string
  private defaultTemperature: number

  constructor(model = 'gpt-3.5-turbo', temperature = 0.7) {
    this.defaultModel = model
    this.defaultTemperature = temperature
  }

  async chat(
    messages: ChatMessage[],
    options?: {
      model?: string
      temperature?: number
      maxTokens?: number
    }
  ): Promise<TokenFactoryResponse> {
    const request: TokenFactoryRequest = {
      model: options?.model || this.defaultModel,
      messages,
      temperature: options?.temperature ?? this.defaultTemperature,
      max_tokens: options?.maxTokens,
    }

    return createTokenFactoryCompletion(request)
  }

  async generateText(
    systemPrompt: string,
    userMessage: string,
    options?: {
      model?: string
      temperature?: number
      maxTokens?: number
    }
  ): Promise<string> {
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ]

    const response = await this.chat(messages, options)
    return response.choices[0]?.message?.content || ''
  }

  async analyzeText(
    text: string,
    analysisPrompt: string,
    options?: {
      model?: string
      temperature?: number
      maxTokens?: number
    }
  ): Promise<string> {
    const systemPrompt = `You are an AI assistant that analyzes text based on the given criteria. ${analysisPrompt}`
    return this.generateText(systemPrompt, text, options)
  }

  async translateText(
    text: string,
    targetLanguage: string,
    options?: {
      model?: string
      temperature?: number
      maxTokens?: number
    }
  ): Promise<string> {
    const systemPrompt = `You are a professional translator. Translate the given text to ${targetLanguage}. Maintain the original tone and style.`
    return this.generateText(systemPrompt, text, options)
  }

  async summarizeText(
    text: string,
    maxLength?: string,
    options?: {
      model?: string
      temperature?: number
      maxTokens?: number
    }
  ): Promise<string> {
    const lengthInstruction = maxLength ? ` in ${maxLength}` : ''
    const systemPrompt = `You are a text summarization assistant. Provide a clear and concise summary${lengthInstruction}.`
    return this.generateText(systemPrompt, text, options)
  }

  async generateBlogContent(
    topic: string,
    keywords: string[],
    options?: {
      model?: string
      temperature?: number
      maxTokens?: number
      tone?: string
      length?: string
    }
  ): Promise<string> {
    const keywordList = keywords.join(', ')
    const tone = options?.tone || 'professional and informative'
    const length = options?.length || 'medium-length'
    
    const systemPrompt = `You are a professional content writer. Create ${length} blog content about the given topic. Use a ${tone} tone. Naturally incorporate these keywords: ${keywordList}. Structure the content with proper headings and sections.`
    
    return this.generateText(systemPrompt, `Topic: ${topic}`, options)
  }
}

// Default instance
export const tokenFactory = new TokenFactory()

// Utility functions for common operations
export const generateText = (systemPrompt: string, userMessage: string, model?: string) =>
  tokenFactory.generateText(systemPrompt, userMessage, { model })

export const analyzeText = (text: string, analysisPrompt: string, model?: string) =>
  tokenFactory.analyzeText(text, analysisPrompt, { model })

export const translateText = (text: string, targetLanguage: string, model?: string) =>
  tokenFactory.translateText(text, targetLanguage, { model })

export const summarizeText = (text: string, maxLength?: string, model?: string) =>
  tokenFactory.summarizeText(text, maxLength, { model })

export const generateBlogContent = (
  topic: string,
  keywords: string[],
  options?: { tone?: string; length?: string; model?: string }
) => tokenFactory.generateBlogContent(topic, keywords, options)