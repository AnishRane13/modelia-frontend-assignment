# AI Image Studio - Modelia Frontend Assignment

A React-based AI image generation studio that simulates AI-powered image transformation with a clean, modern interface.

## 🚀 Features

- **Image Upload & Preview**: Drag & drop or click to upload PNG/JPG images (≤10MB)
- **Smart Downscaling**: Automatically downscales large images to ≤1920px client-side
- **AI Generation**: Mock API with realistic error handling and retry logic
- **Style Selection**: 6 artistic styles (Editorial, Cinematic, Vintage, Artistic, Minimalist, Fantasy)
- **Generation History**: Stores last 5 generations with restore functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Keyboard navigation, focus states, and ARIA attributes

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Linting**: ESLint + Prettier
- **Testing**: React Testing Library + Jest
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnishRane13/modelia-frontend-assignment.git
   cd modelia-frontend-assignment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🧪 Testing

### Run Unit Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Run Linting
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

## 🎨 Design Notes

### Design Philosophy
- **Simple & Intuitive**: Step-by-step workflow that guides users naturally
- **Clean & Modern**: Minimalist design with subtle shadows and rounded corners
- **Mobile-First**: Responsive design that works on all device sizes
- **Accessibility-First**: Built with keyboard navigation and screen reader support

### UI Components
- **Step-by-Step Flow**: Clear numbered steps (1. Upload, 2. Describe, 3. Generate)
- **Progressive Disclosure**: Form sections appear as needed
- **Visual Feedback**: Loading states, success messages, and error handling
- **Consistent Spacing**: 8px grid system for consistent visual rhythm

### Color Palette
- **Primary**: Blue (#3B82F6) for interactive elements
- **Secondary**: Slate grays for text and borders
- **Accent**: Green for success, red for errors
- **Background**: Light gradient from slate-50 to blue-50

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── ImageUpload.tsx      # Image upload with drag & drop
│   ├── PromptInput.tsx      # Text prompt input
│   ├── StyleSelector.tsx    # Style selection grid
│   ├── GenerateButton.tsx   # Generation trigger with retry logic
│   ├── HistoryPanel.tsx     # Generation history display
│   └── Toast.tsx            # Notification system
├── services/
│   ├── mockApi.ts           # Simulated AI generation API
│   └── historyService.ts    # Local storage management
└── types/
    └── index.ts             # TypeScript type definitions
```

### State Management
- **Local State**: React hooks for component-level state
- **Form State**: Controlled inputs with validation
- **API State**: Loading, success, and error states
- **History State**: Local storage with real-time updates

### Error Handling
- **API Errors**: 20% simulated error rate with "Model overloaded" message
- **Retry Logic**: Exponential backoff with max 3 attempts
- **User Abort**: AbortController for canceling requests
- **Graceful Degradation**: Fallback states for all error scenarios

## 🔧 Development

### Code Quality
- **TypeScript Strict Mode**: Enabled for type safety
- **ESLint Rules**: React hooks, accessibility, and best practices
- **Prettier**: Consistent code formatting
- **Component Props**: Strict typing with interfaces

### Performance
- **Image Optimization**: Client-side downscaling
- **Lazy Loading**: Components load as needed
- **Memoization**: React.memo for expensive components
- **Bundle Optimization**: Vite for fast builds

## 🧪 Testing Strategy

### Unit Tests
- **Component Rendering**: Verify components render correctly
- **User Interactions**: Test click, input, and form submissions
- **State Changes**: Validate state updates and side effects
- **Error Handling**: Test error scenarios and edge cases

### E2E Tests
- **User Workflows**: Complete image generation flow
- **Cross-Browser**: Test in multiple browsers
- **Responsive Design**: Verify mobile and desktop layouts
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Deployment

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Environment Variables
- No external API keys required (mock implementation)
- All configuration in code

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Accessibility**: Screen readers, keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is part of the Modelia Frontend Engineer assignment.

## 🆘 Support

For questions about this assignment, contact: frontend@modelia.ai
