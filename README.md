# 👘 Cultural Heritage & Dress-Up Studio

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-Next.js-black?logo=react)

**Cultural Heritage & Dress-Up Studio** is an interactive, frontend-heavy web platform designed for exploring traditional clothing, geographical heritage, and culturally accurate outfit styling. 

Starting with the rich cultural tapestry of Vietnam, this application combines a categorized interactive database, scalable SVG mapping, and a highly advanced rendering engine that prevents visual clipping by utilizing mathematical coordinate positioning for avatar dress-up.

## ✨ Features Overview

*   **Map of Culture:** An interactive, scalable SVG map of Vietnam. Hovering over localized region markers (pins) dynamically reveals rich, slide-in heritage descriptions of local attire and events.
*   **Categorized Database:** A highly responsive masonry grid for exploring cultural assets, filtering between `[Clothes]`, `[Events]`, and `[Avatars]`, with alphabetical and geographical sorting.
*   **AI-Powered Dress-Up Studio:** The core engine of the application. Users can manually build outfits or use a natural language prompt (factoring in weather, budget, and occasion) to receive AI-curated outfits. 
*   **Cultural Validation:** The system actively monitors layered clothing items and warns users if a combination violates cultural norms (e.g., mixing sacred ceremonial items with casual modern wear).

## 🛠 Tech Stack

*   **Frontend:** React (via Next.js for optimized routing and SEO), Tailwind CSS for responsive and themeable utility-first styling.
*   **State Management:** Context API / Zustand (for handling complex canvas and outfit states without unnecessary re-renders).
*   **Backend:** Minimal Node.js/Express (or Next.js API Routes).
*   **AI Integration:** Lightweight LLM API wrapper (e.g., OpenAI, Gemini) dedicated strictly to logical outfit parsing and recommendation.

## 🗂 Project Architecture

The application strictly separates structural routing (`app/`) from reusable UI and complex engine logic (`components/`). 

```text
src/
├── app/ (or root components)
│   ├── layout.tsx (Providers: Theme, i18n, Auth, State)
│   ├── page.tsx (Homepage / Hero / NavCards)
│   └── (routes)/
│       ├── account/page.tsx (AccountDashboard, ProfileInfo, SavedGallery)
│       ├── categories/page.tsx (CategoriesView, Tabs, FilterSort, MasonryGrid, ItemModal)
│       ├── map/page.tsx (MapOfCulture, SVGMap, RegionMarkers, SlideInPanel)
│       └── studio/page.tsx (DressUpStudio - Core Engine)
│
├── components/
│   ├── Global/
│   │   ├── Header.tsx (Logo, [Account], [Settings])
│   │   └── SettingsModal.tsx (LangToggle, ThemeSwitch, A11yToggle)
│   │
│   ├── Map/
│   │   ├── VietnamSVG.tsx (Scalable vector with paths)
│   │   ├── MarkerPin.tsx (Hoverable dots)
│   │   └── HeritagePanel.tsx (Rich description aside)
│   │
│   └── Studio/ (Dress-Up View Components)
│       ├── StudioLayout.tsx (Dashboard grid manager)
│       ├── InputPanel.tsx (AI Text Input & Manual Dropdowns)
│       ├── AvatarCanvas.tsx (Mathematical rendering engine)
|       ├── Avatar/ (Folder for AvatarCanvas.tsx)
│       │   ├── BaseCharacter.tsx
│       │   ├── LayeredItem.tsx (Handles x, y, z-index calculation)
│       │   └── ItemPopover.tsx (Info & Cultural Violation warnings)
│       ├── StudioControls.tsx (Save, Load, Upload)
│       └── ComparisonSidebar.tsx (Loads up to 2 reference avatars)
```

## 🧠 The Dress-Up Engine (Deep Dive)

The `Studio/` directory houses the most complex logic in the application. To ensure high visual fidelity and prevent the visual artifacts common in purely generative AI images, the Dress-Up Studio relies on a **mathematical rendering engine**.

### 1. AvatarCanvas & LayeredItems
Instead of generating flat images, `AvatarCanvas.tsx` acts as a composite stage. Every piece of clothing is a hand-drawn graphical component (SVG/PNG with transparent backgrounds). 
The `LayeredItem.tsx` component calculates placement based on absolute coordinates relative to the `BaseCharacter`. 
Positioning is determined by:
*   **Coordinates:** $(x, y)$ anchoring relative to the skeleton's joints.
*   **Depth:** A strict $z$-index hierarchy (e.g., base skin $= 10$, undergarments $= 20$, outerwear $= 50$, accessories $= 100$) to guarantee overlapping items do not clip.

### 2. Cultural Validation via ItemPopover
As items are added to the canvas state, an internal matrix evaluates the combined array of asset IDs. If incompatible flags are detected (e.g., `isSacred: true` combined with `isCasual: true`), the `ItemPopover.tsx` component is triggered upon user interaction, displaying a **Cultural Violation** warning to educate the user on heritage norms.

## 🤖 AI Integration

To keep the application highly performant, the backend is purposefully minimal. It handles a single crucial pipeline: **Context-to-IDs**.

1.  **Input:** The user submits a prompt via `InputPanel.tsx` (e.g., "Suggest a summer festival outfit in Hue").
2.  **Processing:** The lightweight Node.js backend receives this string, appends system constraints, and queries the LLM API.
3.  **Output:** The backend returns a strict JSON array of **Database Item IDs** and a brief cultural explanation string. 
4.  **Rendering:** The frontend maps these IDs to the local graphical assets and mounts them to the canvas using their predefined $x, y, z$ metadata.

## 🚀 Getting Started / Local Setup

Follow these steps to set up the development environment on your local machine.

### Prerequisites
*   Node.js (v18.x or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/duckling2211/vietnamese-ao-culture
    cd vietnamese-ao-culture
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables**
    Create a `.env.local` file in the root directory and add your LLM API keys for the outfit suggestion backend:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    LLM_API_KEY=your_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🗺 Roadmap / Future Plans

We are actively looking for contributors to help scale the platform. Upcoming milestones include:
*   **Accessibility Scaling:** Implementing the "Disability Assist" toggle in the Settings Modal to optimize UI navigation for screen readers and high-contrast modes.
*   **Geographical Expansion:** Scaling the interactive SVG maps and cultural databases beyond Vietnam to include neighboring Southeast Asian heritages.
*   **Community Marketplace:** Allowing users to upload their own culturally accurate SVG layers for public use after peer validation. 

---
*Developed with care for cultural preservation.*