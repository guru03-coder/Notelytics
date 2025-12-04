# 📚 Notelytics - AI-Powered Study & Research Workspace

<div align="center">

![Notelytics Logo](public/logo.png)

**Transform your study materials into interactive learning experiences with AI**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 🌟 Features

### 📖 **Smart Document Management**
- **PDF Upload & Processing**: Upload and extract text from PDF documents
- **Multi-Document Workspaces**: Organize your study materials by subject
- **Auto-save**: Never lose your work with automatic saving

### 🤖 **AI-Powered Learning**
- **Intelligent Chat**: Ask questions about your documents and get instant AI-powered answers
- **Context-Aware Responses**: AI understands the full context of your uploaded materials
- **Powered by Google Gemini 2.0 Flash**: Latest AI technology for accurate responses

### 🎴 **Flashcard Generation**
- **AI-Generated Flashcards**: Automatically create study flashcards from your documents
- **Interactive Study Mode**: Flip cards to reveal answers and explanations
- **Custom Decks**: Organize flashcards by topic for efficient studying

### 📅 **Exam Scheduler**
- **Visual Calendar**: See all your upcoming exams at a glance
- **Color-Coded Events**: Organize exams by subject with custom colors
- **Notes & Reminders**: Add study notes and important details for each exam

### 🌍 **Multi-Language Support**
- **6 Languages**: Hindi, English, Tamil, Telugu, Bengali, Marathi
- **Seamless Switching**: Change language on-the-fly with persistent preferences
- **Localized UI**: Complete interface translation for better accessibility

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful, modern interface with glass-effect cards
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Easy on the eyes for extended study sessions
- **Smooth Animations**: Powered by Framer Motion for delightful interactions

---

## 🚀 Demo

Visit the live demo: [notelytics.vercel.app](https://notelytics.vercel.app) *(coming soon)*

### Screenshots

<div align="center">

| Dashboard | Workspace | Flashcards |
|-----------|-----------|------------|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Workspace](docs/screenshots/workspace.png) | ![Flashcards](docs/screenshots/flashcards.png) |

</div>

---

## 📦 Installation

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/guru03-coder/Notelytics.git
   cd Notelytics/notelytics-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎯 Usage

### Creating a Subject

1. Click **"New Subject"** on the dashboard
2. Enter a subject name (e.g., "Physics", "History")
3. Start uploading documents

### Uploading Documents

1. Open a subject workspace
2. Click **"Upload Document"**
3. Select a PDF file from your computer
4. Wait for AI processing to complete

### Chatting with AI

1. Upload at least one document
2. Type your question in the chat input
3. Get instant AI-powered answers based on your documents

### Creating Flashcards

1. Switch to the **"Flashcards"** tab
2. Ask AI to generate flashcards from your documents
3. Copy and paste the AI output
4. Click **"Save Flashcards"**
5. Study using the interactive flip cards

### Scheduling Exams

1. Navigate to **"Exam Schedule"** from the navbar
2. Click **"Add Exam"**
3. Fill in subject, date, time, and notes
4. View all exams on the calendar

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Radix UI](https://www.radix-ui.com/)** - Accessible components

### AI & Processing
- **[Google Gemini 2.0 Flash](https://ai.google.dev/)** - AI chat and generation
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - PDF text extraction
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering

### State Management
- **Local Storage** - Client-side data persistence
- **React Hooks** - State and effects management

---

## 📁 Project Structure

```
notelytics-next/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard page
│   │   ├── workspace/          # Workspace page
│   │   ├── exam-schedule/      # Exam scheduler
│   │   ├── features/           # Features page
│   │   ├── pricing/            # Pricing page
│   │   ├── contact/            # Contact page
│   │   └── api/                # API routes
│   │       └── chat/           # AI chat endpoint
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── FlashcardGenerator.tsx
│   ├── lib/                    # Utility functions
│   │   ├── storage.ts          # Local storage helpers
│   │   └── translations.ts     # i18n translations
│   └── hooks/                  # Custom React hooks
│       └── useTranslation.ts   # Translation hook
├── public/                     # Static assets
├── LICENSE                     # Apache 2.0 License
└── README.md                   # This file
```

---

## 🌐 API Configuration

### Gemini API Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env.local`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
3. The app uses Gemini 2.0 Flash for optimal performance

### API Endpoints

- **POST `/api/chat`** - Send messages to AI
  ```typescript
  {
    message: string;
    documentContent: string;
    history: Array<{role: string; content: string}>;
  }
  ```

---

## 🎨 Customization

### Changing Colors

Edit `src/app/globals.css`:
```css
:root {
  --primary: 262.1 83.3% 57.8%;
  --secondary: 280 100% 70%;
  /* ... */
}
```

### Adding Languages

1. Add translations to `src/lib/translations.ts`
2. Update language selector in `src/components/Navbar.tsx`

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test on multiple screen sizes
- Ensure accessibility standards

---

## 📝 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

```
Copyright 2025 Notelytics

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```

---

## 🙏 Acknowledgments

- **Google Gemini** for AI capabilities
- **Vercel** for Next.js framework
- **Radix UI** for accessible components
- **Tailwind Labs** for Tailwind CSS
- **Mozilla** for PDF.js

---

## 📧 Contact

- **GitHub**: [@guru03-coder](https://github.com/guru03-coder)
- **Project Link**: [https://github.com/guru03-coder/Notelytics](https://github.com/guru03-coder/Notelytics)

---

<div align="center">

**Made with ❤️ for students everywhere**

⭐ Star this repo if you find it helpful!

</div>
