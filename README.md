# BrandSpark ✨ – AI Logo Generator

BrandSpark is a web application that uses AI to generate unique logos and branding descriptions for businesses, projects, and teams. Users provide details about their brand, and the app returns a custom logo kit and a tagline, leveraging Google Gemini and Imagen AI models.

---

## Features

- AI-Powered Logo Generation: Instantly create a set of logos (primary, horizontal, vertical, icon) tailored to your brand.
- Customizable Styles & Palettes: Choose from a variety of logo styles and color palettes.
- Brand Tagline Generation: Get a compelling, AI-generated tagline for your brand.
- Downloadable Assets: Download high-quality PNGs of your generated logos.
- Persistent State: Your last input and results are saved in your browser for convenience.

---

## Usage Guide

### 1. Getting Started

- Home/Landing Page:
  - See example logos and a call-to-action to start generating your own.
  - Click "Get Started For Free" or "Create Logo" in the header to begin.

- Logo Generator Page:
  - Fill out the form with:
    - Company/Project Name
    - Description (what your brand does)
    - Logo Style (choose from a curated list)
    - Color Palette (choose a color mood)
  - Click "Generate Logo Kit".

### 2. Logo Generation Process

- The app sends your details to the backend, which:
  1. Uses Gemini AI to generate four detailed prompts (for primary, horizontal, vertical, and icon logos) and a brand tagline.
  2. Uses Imagen AI to generate images for each prompt.
  3. Returns a logo kit (four images) and a tagline.

- Result Section:
  - View your generated logos and tagline.
  - Download each logo as a PNG.

- Error Handling:
  - If required fields are missing or AI generation fails, an error message is shown.

---

## Customization Options

### Logo Styles

Available options:
- Modern & Minimalist
- Classic & Elegant
- Bold & Geometric
- Vintage & Retro
- Abstract & Artistic
- Playful & Fun
- Tech & Futuristic

### Color Palettes

Available options:
- Vibrant & Energetic (Reds, Oranges, Yellows)
- Calm & Trustworthy (Blues, Greens)
- Luxurious & Sophisticated (Black, Gold, Silver)
- Earthy & Natural (Browns, Greens, Tans)
- Modern & Techy (Blues, Purples, Grays)
- Feminine & Soft (Pinks, Purples, Pastels)
- Monochromatic (Shades of one color)

**Note**: More styles coming soon😊😊 

---

## Technical Overview

### Main Components

- App: Handles page navigation and layout (Header, Footer, Main content).
- Landing Page: Welcome page with example logos and a call-to-action.
- Logo Generator Page: Main form for user input, handles state, validation, and displays results.
- UI Components: Button, Input, Select, Spinner for consistent styling and interaction.

### Logo Generation Service

- The service calls Gemini AI to generate prompts and a tagline, then calls Imagen AI to generate images for each prompt, and returns all images and the tagline as a logo kit.

---

## Running the App

1. Install dependencies using your package manager.
2. Set up your Google GenAI API key by configuring the API_KEY environment variable.
3. Start the development server and visit the local address provided in your terminal.
4. Build for production using the appropriate script.

---

## Example Workflow

1. Open the app and click "Get Started For Free".
2. Enter your brand details, select a style and color palette.
3. Click "Generate Logo Kit".
4. Wait for the AI to generate your logos and tagline.
5. Download your logos and use your new brand assets!

---

## Troubleshooting

- API Key Error: If you see an error about the API key, ensure you have set the API_KEY environment variable.
- AI Generation Fails: Try refining your brand description or check your API usage limits.

---

## Credits

- Built with React, Vite, and Tailwind CSS.
- Powered by Google Gemini and Imagen AI.
