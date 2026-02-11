# Nebius Token Factory Integration

This module provides integration with the Nebius Token Factory API, allowing you to use various AI models through a unified interface.

## Setup

1. **Install dependencies** (already done):
   ```bash
   npm install openai
   ```

2. **Set environment variable**:
   Add your Nebius API key to your `.env` file:
   ```env
   VITE_NEBIUS_API_KEY=your_actual_api_key_here
   ```

## Usage

### Basic Client Usage

```typescript
import { createTokenFactoryCompletion } from './lib/nebius/client'

const response = await createTokenFactoryCompletion({
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello, how are you?' }
  ],
  temperature: 0.7,
  max_tokens: 1000
})

console.log(response.choices[0].message.content)
```

### Using the Token Factory Service

```typescript
import { tokenFactory } from './lib/nebius/tokenFactory'

// Generate text
const text = await tokenFactory.generateText(
  'You are a professional writer.',
  'Write a short introduction about AI.'
)

// Analyze text
const analysis = await tokenFactory.analyzeText(
  'This is some text to analyze.',
  'Analyze the sentiment and tone of this text.'
)

// Translate text
const translation = await tokenFactory.translateText(
  'Hello, how are you?',
  'Turkish'
)

// Summarize text
const summary = await tokenFactory.summarizeText(
  'Long text content...',
  'in 2 sentences'
)

// Generate blog content
const blogPost = await tokenFactory.generateBlogContent(
  'The Future of AI',
  ['artificial intelligence', 'machine learning', 'technology'],
  {
    tone: 'professional and engaging',
    length: 'medium-length'
  }
)
```

### Using the React Hook

```typescript
import { useTokenFactory } from './hooks/useTokenFactory'

function MyComponent() {
  const { isLoading, error, response, generateCompletion } = useTokenFactory()

  const handleGenerate = async () => {
    await generateCompletion({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Tell me a joke.' }
      ],
      temperature: 0.8
    })
  }

  return (
    <div>
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
      {error && <div>Error: {error}</div>}
      {response && <div>{response.choices[0]?.message?.content}</div>}
    </div>
  )
}
```

### Demo Component

A complete demo component is available at `src/components/nebius/TokenFactoryDemo.tsx` that shows how to use the Token Factory API with a full UI.

To use it in your app:

```typescript
import { TokenFactoryDemo } from './lib/nebius'

// In your component or route
<TokenFactoryDemo />
```

## Available Models

The exact models available depend on your Nebius Token Factory subscription. Common models include:

- `gpt-3.5-turbo` - Fast and efficient for most tasks
- `gpt-4` - More capable but slower
- `gpt-4-turbo` - Balanced performance and capability

Check your Nebius dashboard for the complete list of available models.

## Error Handling

All functions include proper error handling:

```typescript
try {
  const result = await tokenFactory.generateText(systemPrompt, userMessage)
  console.log(result)
} catch (error) {
  console.error('Token Factory error:', error.message)
}
```

## Type Safety

The integration includes comprehensive TypeScript types:

- `TokenFactoryRequest` - Request format
- `TokenFactoryResponse` - Response format
- `ChatMessage` - Message format
- `TokenFactoryConfig` - Configuration options

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_NEBIUS_API_KEY` | Your Nebius Token Factory API key | Yes |

## Utility Functions

For quick access without instantiating the service:

```typescript
import { generateText, analyzeText, translateText, summarizeText } from './lib/nebius'

const text = await generateText('System prompt', 'User message')
const analysis = await analyzeText('Text to analyze', 'Analysis instructions')
const translation = await translateText('Text to translate', 'Target language')
const summary = await summarizeText('Text to summarize', 'in 3 sentences')
```

## Best Practices

1. **Always handle errors** - API calls can fail for various reasons
2. **Set reasonable token limits** - Use `max_tokens` to control costs
3. **Use appropriate temperatures** - Lower (0.1-0.3) for factual tasks, higher (0.7-1.0) for creative tasks
4. **Cache responses when possible** - Avoid unnecessary API calls
5. **Monitor usage** - Keep track of token consumption for cost management

## Security Notes

- The API key is exposed in the browser environment (client-side usage)
- Only use this for non-sensitive applications
- Consider server-side implementation for sensitive use cases
- Never commit real API keys to version control