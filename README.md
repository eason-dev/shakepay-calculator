# Shakepay ShakingSats Calculator

A Next.js web application to calculate and visualize potential Bitcoin earnings from Shakepay's ShakingSats rewards program.

## Features

- 📊 **Interactive Calculator**: Calculate earnings based on streak length
- 💰 **Currency Support**: View results in USD or CAD
- 📈 **Visual Charts**: Line graphs showing cumulative sats and value over time
- 🎨 **Shakepay Theme**: Official Shakepay blue color scheme
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Live BTC Price**: Automatically fetches current Bitcoin price

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
3. **Choose Currency**: Toggle between USD and CAD display
4. **View Results**: See your potential earnings and interactive charts

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
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
