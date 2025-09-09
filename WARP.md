# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server (requires build first)
npm start

# Lint the codebase
npm run lint
```

### Component Development
The project uses component-based architecture. When developing new components:
- Create components in `src/components/[ComponentName]/[ComponentName].tsx`
- Follow the existing pattern of using TypeScript interfaces for props
- Components use both GSAP and Framer Motion for animations

## Architecture Overview

### Project Structure
- **Next.js 14 App Router**: Uses the modern app directory structure
- **TypeScript**: Fully typed codebase with strict configuration
- **Tailwind CSS**: Utility-first styling with custom Romero color palette
- **Animation Libraries**: 
  - GSAP for complex timeline-based animations (mainly in CardNav)
  - Framer Motion for declarative React animations (Carousel, page transitions)

### Key Components Architecture

#### CardNav Component
- Uses GSAP for complex navigation animations with timeline-based controls
- Implements responsive height calculations for mobile/desktop
- Features hamburger menu with smooth expand/collapse animations
- Manages gallery open/close state with parent callback pattern

#### Carousel Component
- Implements custom cursor interactions with directional navigation hints
- Uses Framer Motion for image transitions and blur effects
- Features project data structure with category, subcategory, and metadata
- Handles responsive layout with proper image optimization

### Styling System
- **Custom Colors**: Romero gray palette (`romero-gray-light`, `romero-gray-medium`, `romero-gray-dark`)
- **Font System**: Primary font is Raleway (loaded via Google Fonts), with Geist fallbacks
- **Responsive Design**: Mobile-first approach with breakpoints handled in Tailwind
- **Animation Integration**: CSS classes work seamlessly with GSAP and Framer Motion

### Data Architecture
Projects are structured as:
```typescript
interface ProjectProps {
  category: string;      // "Residential", "Civic", "Commercial", "Hospitality"
  subcategory: string;   // Specific type within category
  title: string;         // Display name
  description: string;   // Project description
  image: string;         // Path to project image in /public/projects/
  link: string;          // Navigation route
}
```

### Asset Organization
- **Logo variants**: Available in `/public/black/`, `/public/gray/`, `/public/white/` directories
- **Project images**: Stored in `/public/projects/` with numbered naming convention
- **Favicon assets**: Multiple sizes for different devices in `/public/`

### State Management Patterns
- Component-level state with `useState` for UI interactions
- Props drilling for parent-child communication (CardNav → Page → Carousel)
- Custom hooks pattern not currently implemented but recommended for complex state

### Performance Considerations
- Images use Next.js `Image` component with `priority` for above-the-fold content
- GSAP animations use `will-change` CSS property for optimization
- Framer Motion animations configured with proper easing and durations
- Components implement `useLayoutEffect` for DOM-dependent calculations

## Development Notes

### Animation System
- CardNav uses GSAP timelines for precise animation control and reversibility
- Carousel uses Framer Motion variants for declarative animations
- Both systems coexist without conflicts due to different use cases

### Responsive Behavior
- CardNav calculates dynamic heights based on content and screen size
- Carousel implements touch-friendly navigation areas (1/4 width zones)
- All components handle window resize events for proper recalculation

### Code Quality
- ESLint configured with Next.js and TypeScript rules
- Strict TypeScript configuration enabled
- Path aliases configured (`@/` points to `src/`)
