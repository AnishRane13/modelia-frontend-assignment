import { GenerationRequest, GenerationResponse, ApiError } from '../types'

// Simulate 20% error rate
const shouldSimulateError = (): boolean => {
  return Math.random() < 0.2
}

// Generate a mock image URL (in real app, this would be the AI-generated image)
const generateMockImageUrl = (): string => {
  const width = 800
  const height = 600
  const seed = Math.floor(Math.random() * 10000)
  return `https://picsum.photos/${width}/${height}?random=${seed}`
}

// Simulate API delay (1-2 seconds)
const simulateApiDelay = (): Promise<void> => {
  const delay = 1000 + Math.random() * 1000
  return new Promise(resolve => setTimeout(resolve, delay))
}

export const generateImage = async (
  request: GenerationRequest,
  abortSignal?: AbortSignal
): Promise<GenerationResponse> => {
  // Check if request was aborted
  if (abortSignal?.aborted) {
    throw new Error('Request was aborted')
  }

  // Simulate API delay
  await simulateApiDelay()

  // Check if request was aborted during delay
  if (abortSignal?.aborted) {
    throw new Error('Request was aborted')
  }

  // Simulate 20% error rate
  if (shouldSimulateError()) {
    const error: ApiError = {
      message: 'Model overloaded'
    }
    throw error
  }

  // Generate successful response
  const response: GenerationResponse = {
    id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    imageUrl: generateMockImageUrl(),
    prompt: request.prompt,
    style: request.style,
    createdAt: new Date()
  }

  return response
}