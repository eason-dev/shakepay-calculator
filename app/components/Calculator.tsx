'use client';

import { useState, useEffect } from 'react';
import {
  calculateRewards,
  formatCurrency,
  formatNumber,
  CalculationResult,
} from '../utils/calculator';
import Chart from './Chart';

export default function Calculator() {
  const [days, setDays] = useState<number>(365);
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<'USD' | 'CAD'>('USD');
  const [usdToCAD, setUsdToCAD] = useState<number>(1.35);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch current BTC price on mount
  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await response.json();
        if (data.bitcoin?.usd) {
          setBtcPrice(data.bitcoin.usd);
        } else {
          setBtcPrice(95000); // Fallback price
        }
      } catch (error) {
        console.error('Failed to fetch BTC price:', error);
        setBtcPrice(95000); // Fallback price
      } finally {
        setLoading(false);
      }
    };

    fetchBTCPrice();
  }, []);

  // Calculate rewards whenever inputs change
  useEffect(() => {
    if (btcPrice > 0 && days > 0) {
      const calculationResult = calculateRewards(days, btcPrice, usdToCAD);
      setResult(calculationResult);
    }
  }, [days, btcPrice, usdToCAD]);

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setDays(Math.min(value, 10000)); // Cap at 10000 days
    }
  };

  const handleBtcPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBtcPrice(value);
    }
  };

  const handleUsdToCadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setUsdToCAD(value);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-shakepay-blue text-xl">Loading BTC price...</div>
      </div>
    );
  }

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
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Streak Days
              </label>
              <input
                type="number"
                id="days"
                value={days}
                onChange={handleDaysChange}
                min="1"
                max="10000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shakepay-blue focus:border-transparent outline-none transition"
              />
            </div>

            {/* BTC Price Input */}
            <div>
              <label
                htmlFor="btcPrice"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bitcoin Price ({currency})
              </label>
              <input
                type="number"
                id="btcPrice"
                value={btcPrice}
                onChange={handleBtcPriceChange}
                min="0"
                step="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shakepay-blue focus:border-transparent outline-none transition"
              />
            </div>

            {/* Currency Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Currency
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                    currency === 'USD'
                      ? 'bg-shakepay-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  USD
                </button>
                <button
                  onClick={() => setCurrency('CAD')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                    currency === 'CAD'
                      ? 'bg-shakepay-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  CAD
                </button>
              </div>
            </div>

            {/* USD to CAD Rate */}
            <div>
              <label
                htmlFor="usdToCAD"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                USD to CAD Rate
              </label>
              <input
                type="number"
                id="usdToCAD"
                value={usdToCAD}
                onChange={handleUsdToCadChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shakepay-blue focus:border-transparent outline-none transition"
              />
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
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-2xl font-bold text-shakepay-blue">
                      {currency === 'USD'
                        ? formatCurrency(result.totalValueUSD, 'USD')
                        : formatCurrency(result.totalValueCAD, 'CAD')}
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
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average Value/Day</p>
                    <p className="text-2xl font-bold text-shakepay-blue">
                      {currency === 'USD'
                        ? formatCurrency(result.averageValuePerDayUSD, 'USD')
                        : formatCurrency(result.averageValuePerDayCAD, 'CAD')}
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
              <Chart data={result.dailyData} currency={currency} />
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
        </div>
      </div>
    </div>
  );
}
