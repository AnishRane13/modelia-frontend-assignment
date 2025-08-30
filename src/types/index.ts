export interface GenerationData {
    id: string
    imageUrl: string
    prompt: string
    style: string
    createdAt: Date
  }
  
  export interface GenerationRequest {
    imageDataUrl: string
    prompt: string
    style: string
  }
  
  export interface GenerationResponse {
    id: string
    imageUrl: string
    prompt: string
    style: string
    createdAt: Date
  }
  
  export interface ApiError {
    message: string
  }
  
  export interface ToastProps {
    message: string
    type: 'success' | 'error'
    duration?: number
    onClose: () => void
  }
  
  export interface Style {
    value: string
    label: string
    description: string
  }