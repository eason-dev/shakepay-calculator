'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  calculateRewards,
  formatCurrency,
  formatNumber,
  CalculationResult,
} from '../utils/calculator';
import Chart from './Chart';

export default function Calculator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [daysInput, setDaysInput] = useState<string>('365');
  const [btcPriceInput, setBtcPriceInput] = useState<string>('95000');
  const [currentBtcPrice, setCurrentBtcPrice] = useState<number>(95000);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [priceLoading, setPriceLoading] = useState<boolean>(true);
  const [priceFetchError, setPriceFetchError] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize from URL params and fetch BTC price
  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        setPriceLoading(true);
        setPriceFetchError(false);
        const response = await fetch('/api/btc-price');

        if (!response.ok) {
          throw new Error('Failed to fetch BTC price');
        }

        const data = await response.json();
        const price = data.price || 95000;
        setCurrentBtcPrice(price);

        // Read URL parameters
        const urlDays = searchParams.get('days');
        const urlPrice = searchParams.get('price');

        // Set initial values from URL or defaults
        if (urlDays) {
          setDaysInput(urlDays);
        }

        if (urlPrice === 'current' || !urlPrice) {
          setBtcPriceInput(price.toString());
        } else {
          setBtcPriceInput(urlPrice);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to fetch BTC price:', error);
        setPriceFetchError(true);
        setCurrentBtcPrice(95000);

        // Read URL parameters
        const urlDays = searchParams.get('days');
        const urlPrice = searchParams.get('price');

        if (urlDays) {
          setDaysInput(urlDays);
        }

        if (urlPrice === 'current' || !urlPrice) {
          setBtcPriceInput('95000');
        } else {
          setBtcPriceInput(urlPrice);
        }

        setIsInitialized(true);
      } finally {
        setPriceLoading(false);
      }
    };

    fetchBTCPrice();
  }, [searchParams]);

  // Update URL params when inputs change
  useEffect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams();
    if (daysInput) params.set('days', daysInput);

    // Use "current" if price matches current BTC price, otherwise use actual value
    if (btcPriceInput) {
      const priceValue = parseFloat(btcPriceInput);
      if (priceValue === currentBtcPrice) {
        params.set('price', 'current');
      } else {
        params.set('price', btcPriceInput);
      }
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [daysInput, btcPriceInput, isInitialized, router, pathname, currentBtcPrice]);

  // Calculate rewards whenever inputs change
  useEffect(() => {
    const days = parseInt(daysInput);
    const btcPrice = parseFloat(btcPriceInput);

    if (!isNaN(days) && days > 0 && !isNaN(btcPrice) && btcPrice > 0) {
      const calculationResult = calculateRewards(days, btcPrice);
      setResult(calculationResult);
    } else {
      setResult(null);
    }
  }, [daysInput, btcPriceInput]);

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaysInput(e.target.value);
  };

  const handleBtcPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBtcPriceInput(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-shakepay-blue mb-2">
            Shakepay ShakingSats Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your potential Bitcoin earnings from daily shaking
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Days Input */}
            <div>
              <label
                htmlFor="days"
                className="block text-base font-semibold text-gray-800 mb-2"
              >
                Streak Days
              </label>
              <input
                type="number"
                id="days"
                value={daysInput}
                onChange={handleDaysChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shakepay-blue focus:border-transparent outline-none transition text-gray-900"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => setDaysInput('100')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    daysInput === '100'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  100
                </button>
                <button
                  onClick={() => setDaysInput('365')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    daysInput === '365'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  365
                </button>
                <button
                  onClick={() => setDaysInput('1000')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    daysInput === '1000'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  1,000
                </button>
                <button
                  onClick={() => setDaysInput('3000')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    daysInput === '3000'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  3,000
                </button>
                <button
                  onClick={() => setDaysInput('5000')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    daysInput === '5000'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  5,000
                </button>
              </div>
            </div>

            {/* BTC Price Input */}
            <div>
              <label
                htmlFor="btcPrice"
                className="block text-base font-semibold text-gray-800 mb-2"
              >
                Bitcoin Price (USD)
                {priceLoading && (
                  <span className="ml-2 text-xs text-gray-500">Loading current price...</span>
                )}
                {priceFetchError && (
                  <span className="ml-2 text-xs text-orange-500">Using default price</span>
                )}
              </label>
              <input
                type="number"
                id="btcPrice"
                value={btcPriceInput}
                onChange={handleBtcPriceChange}
                min="0"
                step="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shakepay-blue focus:border-transparent outline-none transition text-gray-900"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => setBtcPriceInput(currentBtcPrice.toString())}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    searchParams.get('price') === 'current' || parseFloat(btcPriceInput) === currentBtcPrice
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Current
                </button>
                <button
                  onClick={() => setBtcPriceInput('100000')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    btcPriceInput === '100000'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  100K
                </button>
                <button
                  onClick={() => setBtcPriceInput('200000')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    btcPriceInput === '200000'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  200K
                </button>
                <button
                  onClick={() => setBtcPriceInput('500000')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    btcPriceInput === '500000'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  500K
                </button>
                <button
                  onClick={() => setBtcPriceInput('1000000')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    btcPriceInput === '1000000'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  1M
                </button>
                <button
                  onClick={() => setBtcPriceInput('10000000')}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    btcPriceInput === '10000000'
                      ? 'bg-shakepay-blue text-white ring-2 ring-shakepay-blue ring-offset-1'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  10M
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Total Earnings Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Total Earnings
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Total Satoshis</p>
                    <p className="text-2xl font-bold text-shakepay-blue">
                      {formatNumber(result.totalSats)} sats
                    </p>
                    <p className="text-sm font-medium text-orange-500 mt-1">
                      ({(result.totalSats / 100000000).toFixed(8)} BTC)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Value (USD)</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(result.totalValueUSD)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Average Earnings Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Daily Averages
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Average Sats/Day</p>
                    <p className="text-2xl font-bold text-shakepay-blue">
                      {formatNumber(result.averageSatsPerDay)} sats
                    </p>
                    <p className="text-sm font-medium text-orange-500 mt-1">
                      ({(result.averageSatsPerDay / 100000000).toFixed(8)} BTC)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average Value/Day (USD)</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(result.averageValuePerDayUSD)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Earnings Over Time
              </h3>
              <Chart data={result.dailyData} />
            </div>
          </>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Based on Shakepay&apos;s ShakingSats rewards program. Earn 21-1000 sats
            daily by maintaining your streak.
          </p>
          <p className="mt-2">
            Data source:{' '}
            <a
              href="https://legal.shakepay.com/master/rewards"
              target="_blank"
              rel="noopener noreferrer"
              className="text-shakepay-blue hover:underline"
            >
              Shakepay Rewards
            </a>
          </p>
          <p className="mt-3 flex items-center justify-center gap-4 text-gray-600">
            <a
              href="/support"
              className="inline-flex items-center text-shakepay-blue hover:underline font-medium"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Support this project
            </a>
            <span>
              Built by{' '}
              <a
                href="https://x.com/easondev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black hover:underline font-medium"
              >
                @easondev
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
