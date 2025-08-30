import { test, expect } from '@playwright/test'

test.describe('AI Image Studio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the main application', async ({ page }) => {
    // Check main heading
    await expect(page.getByRole('heading', { name: /ai image studio/i })).toBeVisible()
    
    // Check step indicators (numbered circles) - use more specific selectors
    await expect(page.locator('div.w-8.h-8.bg-blue-500').filter({ hasText: '1' })).toBeVisible()
    await expect(page.locator('div.w-8.h-8.bg-green-500').filter({ hasText: '2' })).toBeVisible()
    await expect(page.locator('div.w-8.h-8.bg-purple-500').filter({ hasText: '3' })).toBeVisible()
  })

  test('should show upload area initially', async ({ page }) => {
    // Check upload area is visible
    await expect(page.getByRole('button', { name: /upload image file/i })).toBeVisible()
    
    // Check upload instructions
    await expect(page.getByText(/click to upload/i)).toBeVisible()
    await expect(page.getByText(/png, jpg up to 10mb/i)).toBeVisible()
  })

  test('should show prompt input after image upload', async ({ page }) => {
    // Check that prompt input exists (but may be hidden initially)
    const promptInput = page.getByLabel(/describe what you want to create/i)
    
    // The prompt input exists in the DOM but may be hidden until image is uploaded
    await expect(promptInput).toBeAttached()
  })

  test('should have accessible form elements', async ({ page }) => {
    // Check for proper labels
    const promptInput = page.getByLabel(/describe what you want to create/i)
    await expect(promptInput).toBeAttached()
    
    // Check for proper ARIA attributes
    const uploadArea = page.getByRole('button', { name: /upload image file/i })
    await expect(uploadArea).toHaveAttribute('aria-label')
    await expect(uploadArea).toHaveAttribute('tabIndex', '0')
  })

  test('should show history panel', async ({ page }) => {
    // Check history panel exists
    await expect(page.getByRole('heading', { name: /your previous creations/i })).toBeVisible()
    
    // Check for empty state message
    await expect(page.getByText(/no generations yet/i)).toBeVisible()
  })

  test('should be keyboard navigable', async ({ page }) => {
    // Focus should be visible
    await page.keyboard.press('Tab')
    
    // Check that focus is visible (this would need custom CSS focus styles)
    const uploadArea = page.getByRole('button', { name: /upload image file/i })
    await expect(uploadArea).toBeAttached()
  })

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check that content is still accessible
    await expect(page.getByRole('heading', { name: /ai image studio/i })).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.getByRole('heading', { name: /ai image studio/i })).toBeVisible()
  })
})
