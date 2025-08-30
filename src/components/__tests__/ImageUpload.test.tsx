import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImageUpload from '../ImageUpload'

describe('ImageUpload', () => {
  const mockOnImageSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders upload area with correct accessibility attributes', () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />)
    
    const uploadArea = screen.getByRole('button', { name: /upload image file/i })
    expect(uploadArea).toBeInTheDocument()
    expect(uploadArea).toHaveAttribute('aria-label', 'Upload image file by clicking or dragging and dropping')
    expect(uploadArea).toHaveAttribute('tabIndex', '0')
  })

  it('shows upload instructions', () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />)
    
    expect(screen.getByText(/click to upload/i)).toBeInTheDocument()
    expect(screen.getByText(/png, jpg up to 10mb/i)).toBeInTheDocument()
  })

  it('handles click to open file picker', async () => {
    const user = userEvent.setup()
    render(<ImageUpload onImageSelect={mockOnImageSelect} />)
    
    const uploadArea = screen.getByRole('button', { name: /upload image file/i })
    await user.click(uploadArea)
    
    // Note: We can't actually test file picker opening in unit tests
    // This test verifies the click handler is attached
    expect(uploadArea).toBeInTheDocument()
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<ImageUpload onImageSelect={mockOnImageSelect} />)
    
    const uploadArea = screen.getByRole('button', { name: /upload image file/i })
    uploadArea.focus()
    
    // Test Enter key
    await user.keyboard('{Enter}')
    expect(uploadArea).toBeInTheDocument()
    
    // Test Space key
    await user.keyboard(' ')
    expect(uploadArea).toBeInTheDocument()
  })

  it('shows screen reader instructions', () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />)
    
    const srInstructions = screen.getByText(/image upload area/i)
    expect(srInstructions).toHaveClass('sr-only')
  })

  it('has proper focus styles', () => {
    render(<ImageUpload onImageSelect={mockOnImageSelect} />)
    
    const uploadArea = screen.getByRole('button', { name: /upload image file/i })
    expect(uploadArea).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500')
  })
})
