# Shakepay ShakingSats Calculator

**Calculate your Bitcoin earnings from daily shaking!** 📳

🚀 **[Try it now at shakingsats.vercel.app](https://shakingsats.vercel.app)**

[![Shakepay ShakingSats Calculator](./public/og-image.png)](https://shakingsats.vercel.app)

A free, open-source web calculator to visualize and track your potential Bitcoin earnings from Shakepay's ShakingSats rewards program. Whether you're just starting your streak or you're a ShakingSats veteran with thousands of days, this tool helps you understand the real value of maintaining your daily shake habit.

**Perfect for:**
- 🎯 Planning your long-term Bitcoin accumulation strategy
- 📊 Visualizing earnings across different BTC price scenarios
- 💰 Supporting both USD and CAD views
- 🔗 Sharing your streak projections with friends
- 📱 Quick calculations on any device

## Features

- 📊 **Interactive Calculator**: Calculate earnings based on streak length
- 💰 **Multi-Currency Support**: Toggle between USD and CAD with live exchange rates
- 📈 **Visual Charts**: Dual-axis line graphs showing cumulative sats and currency value over time
- 🎨 **Shakepay Theme**: Official Shakepay blue color scheme
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Live BTC Price**: Automatically fetches current Bitcoin prices in both USD and CAD
- 🔗 **Shareable Links**: URL parameters persist calculator settings and currency preference
- 🎯 **Quick Presets**: Fast selection buttons for common values
- 💝 **Support Page**: Bitcoin donation support with QR codes

## How It Works

Shakepay's ShakingSats program rewards active users with Bitcoin satoshis for maintaining daily shake streaks:

- **Day 1**: 21 sats
- **Days 2-999**: Linear progression (increases daily)
- **Day 1000+**: 1000 sats per day

Users must shake their phone daily before midnight EST to maintain their streak.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shakepay-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter Streak Days**: Input how many days you want to calculate (default: 365)
2. **Set Bitcoin Price**: Adjust the BTC price or use the auto-fetched current price
3. **Use Preset Buttons**: Quick selection for common streak lengths (100, 365, 1000, 3000) and BTC prices
4. **View Results**: See your potential earnings with sats, BTC, and USD values
5. **Share Your Calculation**: Copy the URL to share your specific scenario

## Configuration

### Support Page Setup

Update the following in `app/support/page.tsx`:

```typescript
const shaketag = '@yourname'; // Your Shakepay shaketag
const bitcoinAddress = 'bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Your Bitcoin address
const twitterHandle = '@yourhandle'; // Your Twitter handle
const twitterUrl = 'https://twitter.com/yourhandle';
```

### SEO & Metadata

Update the following in `app/layout.tsx`:

- `metadataBase`: Your actual domain URL
- `twitter.creator`: Your Twitter handle
- Create an OpenGraph image at `public/og-image.png` (1200x630px recommended)

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **QR Codes**: qrcode.react
- **Price API**: CoinGecko API

## Project Structure

```
shakepay-calculator/
├── app/
│   ├── components/
│   │   ├── Calculator.tsx    # Main calculator component
│   │   └── Chart.tsx          # Chart visualization component
│   ├── utils/
│   │   └── calculator.ts      # Calculation logic and utilities
│   ├── globals.css            # Global styles and Shakepay theme
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/                    # Static assets
└── package.json
```

## Build for Production

```bash
npm run build
npm start
```

## Data Source

Based on official Shakepay rewards documentation:
[https://legal.shakepay.com/master/rewards](https://legal.shakepay.com/master/rewards)

## License

MIT

## Disclaimer

This calculator is an unofficial tool created for educational purposes. It is not affiliated with or endorsed by Shakepay. Actual rewards may vary based on program changes and terms of service.
