import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GenerateButton from '../GenerateButton'

// Mock the services
jest.mock('../../services/mockApi', () => ({
  generateImage: jest.fn()
}))

jest.mock('../../services/historyService', () => ({
  saveToHistory: jest.fn()
}))

describe('GenerateButton', () => {
  const mockOnGenerationComplete = jest.fn()
  const mockOnError = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders generate button with correct accessibility attributes', () => {
    render(
      <GenerateButton
        imageDataUrl="data:image/jpeg;base64,mocked"
        prompt="Test prompt"
        style="editorial"
        onGenerationComplete={mockOnGenerationComplete}
        onError={mockOnError}
      />
    )
    
    const generateButton = screen.getByRole('button', { name: /generate ai image/i })
    expect(generateButton).toBeInTheDocument()
    expect(generateButton).toHaveAttribute('aria-label', 'Generate AI image')
  })

  it('shows disabled state when required fields are missing', () => {
    render(
      <GenerateButton
        imageDataUrl={null}
        prompt=""
        style="editorial"
        onGenerationComplete={mockOnGenerationComplete}
        onError={mockOnError}
      />
    )
    
    const generateButton = screen.getByRole('button', { name: /generate ai image.*disabled/i })
    expect(generateButton).toBeDisabled()
    
    // Use the specific element with role="note" instead of generic text search
    const disabledReason = screen.getByRole('note', { name: /why generation is disabled/i })
    expect(disabledReason).toHaveTextContent(/please upload an image and write a description first/i)
  })

  it('shows enabled state when all fields are provided', () => {
    render(
      <GenerateButton
        imageDataUrl="data:image/jpeg;base64,mocked"
        prompt="Test prompt"
        style="editorial"
        onGenerationComplete={mockOnGenerationComplete}
        onError={mockOnError}
      />
    )
    
    const generateButton = screen.getByRole('button', { name: /generate ai image/i })
    expect(generateButton).not.toBeDisabled()
    
    // Use the specific element with role="note" instead of generic text search
    const instructions = screen.getByRole('note', { name: /generation instructions/i })
    expect(instructions).toHaveTextContent(/click to start ai generation/i)
  })

  it('has proper focus styles', () => {
    render(
      <GenerateButton
        imageDataUrl="data:image/jpeg;base64,mocked"
        prompt="Test prompt"
        style="editorial"
        onGenerationComplete={mockOnGenerationComplete}
        onError={mockOnError}
      />
    )
    
    const generateButton = screen.getByRole('button', { name: /generate ai image/i })
    expect(generateButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500')
  })

  it('shows screen reader instructions', () => {
    render(
      <GenerateButton
        imageDataUrl="data:image/jpeg;base64,mocked"
        prompt="Test prompt"
        style="editorial"
        onGenerationComplete={mockOnGenerationComplete}
        onError={mockOnError}
      />
    )
    
    // Look for the specific screen reader content
    const srInstructions = screen.getByText(/generate button is ready/i)
    expect(srInstructions).toHaveClass('sr-only')
  })
})
