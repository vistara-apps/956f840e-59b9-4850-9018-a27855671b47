# RemixAi - AI Ad Variants & Auto-Post to Social

A Next.js Base Mini App that transforms one product image into multiple high-converting ad variants and automatically posts them to social media platforms.

## Features

- **AI-Powered Creative Generation**: Upload a single product image and generate 3-5 distinct ad creative variations with different angles, styles, and text overlays
- **Automated Platform Adaptation**: Automatically resizes and formats creatives for TikTok, Instagram, and other platforms
- **One-Click Social Posting**: Connect social media accounts and post selected variants directly from the app
- **Basic Performance Tracking**: Simple dashboard showing key metrics for posted variations

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Base Integration**: OnchainKit for wallet connection and Base chain interaction
- **AI Generation**: OpenRouter API with Google Gemini 2.0 Flash
- **Social Integration**: Neynar API for Farcaster posting
- **Storage**: Pinata for IPFS image storage
- **Database**: Supabase for user data and campaign management

## Getting Started

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Copy `.env.example` to `.env.local` and configure:
   ```bash
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   NEYNAR_API_KEY=your_neynar_api_key
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_KEY=your_pinata_secret_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Core Components

- **ImageUploader**: Drag-and-drop interface for product image upload
- **CreativePreview**: Gallery view of generated ad variants with selection
- **PlatformSelector**: Choose target platforms (Instagram, TikTok)
- **SocialConnectionManager**: Connect and manage social media accounts
- **MetricCard**: Display performance metrics for posted campaigns

## Design System

- **Colors**: Dark theme with purple/orange gradient accents
- **Typography**: Inter font family with responsive text scales
- **Spacing**: 8px base unit with sm/md/lg/xl variants
- **Animations**: Smooth transitions with cubic-bezier easing

## API Routes

- `/api/generate-variants`: Generate AI ad variants from uploaded image
- `/api/post-to-social`: Post selected variants to connected social accounts
- `/api/upload-image`: Handle image upload to IPFS storage

## Business Model

- **Micro-transactions**: $0.50 per 5-variant generation set
- **Subscription Plans**: $29/month for 100 generations
- **Pay-as-you-go**: Perfect for solo founders and growth hackers

## Deployment

Built for deployment on Vercel with automatic Base mainnet integration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
