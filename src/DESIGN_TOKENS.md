# Notelytics Design System Documentation

## Developer Handoff Guide

This document contains all design tokens, component specifications, and asset export guidelines for implementing the Notelytics marketing website.

---

## 🎨 Design Tokens (CSS Variables)

### Copy-Paste Ready CSS Tokens

```css
:root {
  /* Colors */
  --color-primary: #4C6EF5;
  --color-accent: #7C3AED;
  --gradient-1: linear-gradient(135deg, #4C6EF5 0%, #7C3AED 100%);
  --bg: #0B1020;
  --card-bg: rgba(255, 255, 255, 0.04);
  --text-primary: #E6EEF8;
  --text-secondary: #B6C5DD;
  --muted: #92A3BF;
  --success: #22C55E;
  --warning: #F59E0B;
  --error: #EF4444;
  
  /* Spacing - 8px base grid */
  --spacing-base: 8px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Border Radius */
  --radius-card: 18px;
  --radius-pill: 999px;
  
  /* Backdrop Blur */
  --blur: 14px;
  
  /* Shadows */
  --shadow-near: 0 6px 18px rgba(12, 18, 36, 0.6);
  --shadow-far: 0 24px 60px rgba(2, 6, 23, 0.7);
  
  /* Motion */
  --ease-micro: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-micro: 150ms;
  --duration-medium: 320ms;
  --duration-large: 700ms;
}
```

---

## 📝 Typography

### Font Families
- **Headlines**: Poppins SemiBold (600)
- **Body**: Inter Regular (400)
- **UI Text**: Inter Regular (400)

### Font Sizes (Responsive)

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 (Headline) | 32px | 40px | 48px |
| H2 | 24px | 28px | 32px |
| H3 (Subhead) | 20px | 22px | 24px |
| Body | 16px | 16px | 16px |
| UI Small | 13-14px | 13-14px | 13-14px |

### Line Heights
- Headlines: 1.2
- Subheads: 1.3-1.4
- Body: 1.5

---

## 🧩 Component Library

### Atoms

#### Button (Primary)
- **Background**: `linear-gradient(135deg, #4C6EF5, #7C3AED)`
- **Text**: White
- **Padding**: 
  - Small: 8px 16px
  - Medium: 12px 24px
  - Large: 16px 32px
- **Border Radius**: 12px (sm), 16px (md), 18px (lg)
- **Hover**: Glow shadow `0 0 20px rgba(76,110,245,0.4)`
- **Active**: Scale 0.95
- **Transition**: 150ms cubic-bezier(0.22,1,0.36,1)

#### Button (Secondary)
- **Background**: `rgba(255,255,255,0.04)` with 14px blur
- **Border**: 1px solid `rgba(255,255,255,0.1)`
- **Text**: `#E6EEF8`
- **Hover**: Border → `#4C6EF5`, Background → `rgba(255,255,255,0.1)`

#### Input Fields
- **Background**: `rgba(255,255,255,0.05)`
- **Border**: 1px solid `rgba(255,255,255,0.1)`
- **Text**: `#E6EEF8`
- **Focus**: Border → `#4C6EF5`
- **Padding**: 12px 16px
- **Border Radius**: 12px

### Molecules

#### FeatureCard
- **Container**: 
  - Background: `rgba(255,255,255,0.04)`
  - Border: 1px solid `rgba(255,255,255,0.05)`
  - Border Radius: 18px
  - Padding: 24px
  - Backdrop Blur: 14px
- **Icon Container**:
  - Size: 48px × 48px
  - Background: Gradient `#4C6EF5 → #7C3AED`
  - Border Radius: 12px
- **Hover**: 
  - Border → `rgba(76,110,245,0.5)`
  - Transform: translateY(-4px)
  - Shadow: `0 6px 18px rgba(12,18,36,0.6)`

#### UploadModal
- **Backdrop**: Black 60% opacity with blur
- **Panel**:
  - Max Width: 600px
  - Background: `#0B1020`
  - Border: 1px solid `rgba(255,255,255,0.1)`
  - Border Radius: 18px
  - Shadow: `0 24px 60px rgba(2,6,23,0.7)`

### Organisms

#### Hero Section
- **Headline**: Poppins SemiBold 32/40/48px (mobile/tablet/desktop)
- **Subheadline**: Inter Regular 16px, color `#B6C5DD`
- **CTA Buttons**: Large size, 16px gap between
- **Badge**: 
  - Background: `rgba(255,255,255,0.04)`
  - Border: 1px solid `rgba(255,255,255,0.1)`
  - Border Radius: 999px
  - Padding: 8px 16px
  - Pulse indicator: 8px circle, `#22C55E`

#### TopBar
- **Height**: 64px (mobile), 80px (desktop)
- **Background**: `rgba(255,255,255,0.04)` with 14px blur
- **Border Bottom**: 1px solid `rgba(255,255,255,0.05)`
- **Logo Size**: 40px × 40px
- **Nav Spacing**: 32px gap between items

---

## 📱 Responsive Breakpoints

```css
/* Mobile-first approach */
- Mobile: < 768px (default)
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px
```

### Layout Patterns

#### Mobile (375px)
- Single column layout
- Sticky bottom nav (64px height)
- Bottom sheet for modals
- 16px side padding

#### Tablet (768px)
- 2-column grid for feature cards
- Side drawer for navigation
- 24px side padding

#### Desktop (1440px)
- 3-column grid for feature cards
- Fixed top navigation
- Max width container: 1280px
- 32px side padding

---

## 🎭 Animations & Micro-interactions

### Common Animations

```css
/* Fade In */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Button Press */
.button:active {
  transform: scale(0.95);
  transition: transform 150ms cubic-bezier(0.22,1,0.36,1);
}

/* Hover Glow */
.button-primary:hover {
  box-shadow: 0 0 20px rgba(76,110,245,0.4);
}
```

---

## 📦 Asset Export List

### Icons & Logos
- `logo.svg` - Main logo (3 sizes: 24px, 40px, 64px)
- `favicon.svg` - 32px × 32px
- `app-icon.png` - 512px × 512px (2× export)

### Lottie Animations
- `assets/lottie/notelytics_intro.json` - Hero animation
- `assets/lottie/avatar_pulse.json` - AI assistant indicator
- `assets/lottie/typing_skeleton.json` - Loading state
- `assets/lottie/confetti_small.json` - Success celebration

### Images
All images exported at 2× resolution (PNG)
- Hero background gradient overlays
- Device mockups (transparent backgrounds)
- Feature illustrations

### SVG Icons
Export from lucide-react library:
- Brain, FileSearch, Network, Zap, Repeat, Sparkles
- Upload, Camera, FileText, Mic
- Home, User, BookOpen
- Check, X, Plus, Settings

---

## 🔌 Component Props Reference

### Button Component
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

### FeatureCard Component
```typescript
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number; // Animation delay in ms
}
```

### UploadModal Component
```typescript
interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (type: string, file?: File) => void;
}
```

### DocumentViewer Component
```typescript
interface DocumentViewerProps {
  documentName: string;
  onClose: () => void;
  onExplain?: (text: string) => void;
}
```

---

## 🎯 Prototype Flows

### Flow 1: Upload → Highlight → Explain
1. User clicks "Try Notelytics" CTA
2. Upload modal appears (scale-in animation 320ms)
3. User selects/drops file
4. Document viewer opens with uploaded document
5. User highlights text
6. Highlight menu appears above selection
7. User clicks "Explain"
8. AI panel slides in from right (320ms)
9. Response appears with typing animation

### Flow 2: Concept Map Exploration
1. User scrolls to Concept Map section
2. Interactive graph is visible
3. User clicks a node
4. Node scales up and changes color
5. Right panel updates with node details
6. User can add to study plan

### Flow 3: Flashcard Session
1. User navigates to Flashcard section
2. Card displays question side
3. User clicks card → flip animation (700ms)
4. Answer revealed
5. User selects difficulty (Know/Hard/Forgot)
6. Progress bar updates
7. Next card slides in

---

## ♿ Accessibility Requirements

### Contrast Ratios
- Body text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

### Keyboard Navigation
- All interactive elements must be focusable
- Focus indicators: 2px solid `#4C6EF5` outline
- Tab order follows visual flow
- Escape key closes modals

### Screen Reader Support
- Semantic HTML (nav, main, section, article)
- ARIA labels on icon-only buttons
- Alt text on all images
- Live regions for dynamic content

### Color Blindness Considerations
- Don't rely solely on color for information
- Use icons + text labels
- Success/error states include icons

---

## 📐 Grid & Spacing System

### 8px Base Grid
All spacing increments should be multiples of 8:
- 8px (xs)
- 12px (sm) - exception for compact UI
- 16px (md)
- 24px (lg)
- 32px (xl)
- 48px (2xl)

### Component Spacing
- Section vertical padding: 80px (mobile), 120px (desktop)
- Card padding: 24px (mobile), 32px (desktop)
- Button padding: 12px 24px (md)
- Input padding: 12px 16px

---

## 🚀 Performance Notes

### Optimization Guidelines
- Lazy load images below the fold
- Use CSS transforms for animations (GPU accelerated)
- Implement virtualization for long lists
- Compress Lottie files
- Use WebP format for images where supported

### Critical Path
1. Load CSS variables first
2. Render above-the-fold content
3. Defer non-critical JavaScript
4. Lazy load modal components

---

## 📞 API Endpoints (Mock)

For prototype purposes, use these mock endpoint shapes:

```typescript
POST /api/uploads
Body: FormData with 'file' field
Response: { id: string, name: string, pages: number }

POST /api/explain
Body: { text: string, documentId: string }
Response: { explanation: string, sources: string[], confidence: number }

GET /api/documents
Response: { documents: Array<{ id, name, uploadDate }> }

POST /api/flashcards/session
Body: { documentIds: string[] }
Response: { cards: Array<{ id, question, answer }> }
```

---

## 📄 Notes for Designers

1. **Glassmorphism**: All card backgrounds use `rgba(255,255,255,0.04)` with 14px blur
2. **Gradients**: Primary gradient is 135deg from `#4C6EF5` to `#7C3AED`
3. **Shadows**: Use two-tier system (near/far) for depth
4. **Motion**: Keep animations subtle; provide reduced motion alternative
5. **Dark Theme**: This is the primary theme; light variant is optional

---

## ✅ Implementation Checklist

- [x] Design system tokens defined
- [x] Component library built
- [x] Responsive layouts implemented
- [x] Interactive prototypes wired
- [x] Accessibility features added
- [x] Animation states defined
- [x] Asset export list created
- [x] Developer handoff documentation

---

**Last Updated**: December 3, 2025  
**Version**: 1.0  
**Created for**: Notelytics Marketing Website
