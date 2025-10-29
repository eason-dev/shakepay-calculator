'use client';

import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';

export default function SupportPage() {
  // TODO: Replace with your actual information
  const shaketag = '@yourname'; // Your Shakepay shaketag
  const bitcoinAddress = 'bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Your Bitcoin address
  const twitterHandle = '@yourhandle'; // Your Twitter handle
  const twitterUrl = 'https://twitter.com/yourhandle';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-shakepay-blue mb-3">
            Support This Project
          </h1>
          <p className="text-gray-600 text-lg">
            If you find this calculator helpful, consider supporting its development!
          </p>
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-shakepay-blue hover:text-blue-700 transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Calculator
          </Link>
        </div>

        {/* Support Options */}
        <div className="space-y-6">
          {/* Shakepay */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-shakepay-blue rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Shakepay</h2>
                <p className="text-gray-600">Send via Shakepay (zero fees!)</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Shaketag:</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-mono font-semibold text-shakepay-blue">
                  {shaketag}
                </p>
                <button
                  onClick={() => copyToClipboard(shaketag, 'Shaketag')}
                  className="px-4 py-2 bg-shakepay-blue text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Bitcoin */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">₿</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Bitcoin</h2>
                <p className="text-gray-600">Send BTC directly</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                <QRCodeSVG
                  value={bitcoinAddress}
                  size={200}
                  level="H"
                />
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Bitcoin Address:</p>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-mono text-gray-800 break-all mr-4">
                  {bitcoinAddress}
                </p>
                <button
                  onClick={() => copyToClipboard(bitcoinAddress, 'Bitcoin address')}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm whitespace-nowrap"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Follow Me</h2>
                <p className="text-gray-600">Connect on Twitter/X</p>
              </div>
            </div>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              {twitterHandle}
            </a>
          </div>

          {/* Thank You Message */}
          <div className="bg-gradient-to-r from-shakepay-blue to-blue-600 rounded-2xl shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-lg opacity-90">
              Your support helps keep this tool free and continuously improved for the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
