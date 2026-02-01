# Missions Display

Interactive missions display system for churches with touch screen kiosk interface. Sample Data for Now.

## Features

- Interactive world map with region-based navigation
- Missionary profiles and detail views
- PDF newsletter viewing
- Email/SMS sharing capabilities
- Touch-optimized for 1080p/4K/8K displays
- Subscription management

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Zustand (state management)
- React Simple Maps
- react-pdf

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── map/               # Map components
│   ├── missionary/        # Missionary components
│   ├── pdf/               # PDF viewer
│   ├── shared/            # Shared components
│   └── forms/             # Forms
├── lib/store/             # Zustand stores
├── services/              # API service layer
├── data/mock/             # Mock data
├── types/                 # TypeScript types
├── hooks/                 # Custom hooks
└── config/                # Configuration
```

## Environment Variables

See `.env.example` for required environment variables.

## License

Private
