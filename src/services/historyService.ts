import { GenerationResponse } from './mockApi'

const HISTORY_KEY = 'ai_studio_generations'
const MAX_HISTORY_ITEMS = 5

export const saveToHistory = (generation: GenerationResponse): void => {
  try {
    const existingHistory = getHistory()
    
    // Add new generation to the beginning
    const updatedHistory = [generation, ...existingHistory]
    
    // Keep only the last 5 items
    const trimmedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS)
    
    // Save to localStorage
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory))
  } catch (error) {
    console.error('Error saving to history:', error)
  }
}

export const getHistory = (): GenerationResponse[] => {
  try {
    const historyData = localStorage.getItem(HISTORY_KEY)
    if (!historyData) return []
    
    const parsedHistory = JSON.parse(historyData)
    
    // Convert string dates back to Date objects
    return parsedHistory.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt)
    }))
  } catch (error) {
    console.error('Error reading history:', error)
    return []
  }
}

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch (error) {
    console.error('Error clearing history:', error)
  }
}

export const removeFromHistory = (id: string): void => {
  try {
    const existingHistory = getHistory()
    const filteredHistory = existingHistory.filter(item => item.id !== id)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filteredHistory))
  } catch (error) {
    console.error('Error removing from history:', error)
  }
}
