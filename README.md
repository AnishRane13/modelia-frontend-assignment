# 🎨 AI Image Studio

A modern React web application that simulates an AI-powered image transformation studio. Built with React 19, TypeScript, and TailwindCSS, featuring a clean, accessible interface for uploading images, applying AI-generated styles, and managing generation history.

## ✨ Features

### 🖼️ **Upload & Preview**
- Drag & drop or click to upload PNG/JPG images (≤10MB)
- Client-side image downscaling to ≤1920px for optimal performance
- Real-time preview with responsive design

### 🎯 **Prompt & Style Selection**
- Rich text input for describing your creative vision
- 5 curated art styles: Editorial, Streetwear, Vintage, Minimalist, and Artistic
- Live summary showing image + prompt + selected style

### 🚀 **AI Generation (Mock API)**
- Simulated AI image generation with realistic 1-2 second delays
- 20% "Model overloaded" error simulation for testing
- Automatic retry with exponential backoff (max 3 attempts)
- Request abortion functionality
- Loading states with progress indicators

### 📚 **Generation History**
- Local storage persistence for last 5 generations
- Click-to-restore functionality for previous creations
- Thumbnail previews with metadata
- Delete individual history items

### ♿ **Accessibility Features**
- Full keyboard navigation support
- Visible focus states with custom styling
- Comprehensive ARIA labels and descriptions
- Screen reader optimized content
- Semantic HTML structure

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: TailwindCSS v3
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library + Playwright
- **Code Quality**: ESLint + Prettier

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/modelia-frontend-assignment.git
   cd modelia-frontend-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🧪 Testing

### Unit Tests
```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test -- --coverage
```

### End-to-End Tests
```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npx playwright test --ui
```

### Test Coverage
- **Unit Tests**: Component rendering, accessibility, user interactions
- **E2E Tests**: Cross-browser compatibility, responsive design, user workflows
- **Coverage**: Aiming for >80% code coverage

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── ImageUpload.tsx      # File upload with drag & drop
│   ├── PromptInput.tsx      # Text input with validation
│   ├── StyleSelector.tsx    # Style dropdown selection
│   ├── GenerateButton.tsx   # Generation trigger with states
│   ├── HistoryPanel.tsx     # Generation history display
│   └── Toast.tsx           # Notification system
├── services/
│   ├── mockApi.ts          # Simulated AI generation API
│   └── historyService.ts   # Local storage management
├── types/
│   └── index.ts            # TypeScript interfaces
└── App.tsx                 # Main application component
```

### State Management
- **Local State**: React hooks for component-level state
- **Form State**: Controlled inputs with validation
- **API State**: Loading, success, and error states
- **History State**: Local storage persistence

### Error Handling
- **API Errors**: Exponential backoff retry mechanism
- **User Errors**: Form validation and helpful messages
- **Network Errors**: Graceful degradation and retry options
- **Error Boundaries**: Component-level error isolation

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) for interactive elements
- **Secondary**: Slate grays for text and backgrounds
- **Accent**: Green (#10B981) for success states
- **Error**: Red (#EF4444) for error states

### Typography
- **Headings**: Inter font family with varying weights
- **Body**: System font stack for optimal readability
- **Scale**: Consistent 4px grid system

### Spacing & Layout
- **Container**: Max-width 4xl with responsive padding
- **Components**: Consistent 6-unit spacing between sections
- **Responsive**: Mobile-first approach with breakpoint adjustments

## 📱 Responsive Design

- **Mobile**: 375px+ with touch-optimized interactions
- **Tablet**: 768px+ with adaptive layouts
- **Desktop**: 1024px+ with enhanced spacing and features
- **Large**: 1280px+ with optimal content width

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Run Prettier
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests
```

### Code Quality
- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Pre-commit**: Hooks for code quality checks

### Performance Optimizations
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Client-side downscaling
- **Memoization**: React.memo for expensive components
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Output
- **Static Files**: Optimized HTML, CSS, and JavaScript
- **Assets**: Compressed images and fonts
- **Service Worker**: PWA capabilities for offline support

### Hosting Options
- **Vercel**: Zero-config deployment with automatic previews
- **Netlify**: Drag & drop deployment with form handling
- **GitHub Pages**: Free hosting for open source projects
- **AWS S3**: Scalable static hosting with CloudFront

## 🌐 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Fallbacks**: Graceful degradation for older browsers

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with proper testing
4. **Commit your changes**: `git commit -m 'feat: Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request** with detailed description

### Commit Convention
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation updates
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Test additions or updates
- **chore**: Build process or tooling changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Create a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Documentation**: Check the [Wiki](../../wiki) for detailed guides

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **TailwindCSS**: For the utility-first CSS framework
- **Vite**: For the fast build tool
- **Playwright**: For the excellent testing framework
- **Lucide**: For the beautiful icon set

---

**Built with ❤️ using modern web technologies**
