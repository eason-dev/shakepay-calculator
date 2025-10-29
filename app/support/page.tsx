'use client';

import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';
import { useState } from 'react';

export default function SupportPage() {
  const shaketag = '@easonchang';
  const bitcoinAddress = 'bc1qgmlzwhlkvkquwqxkefwfzqfvhjkw4j8wdf5j6sdmt3mrgc7rehxsw9mn9k';
  const twitterHandle = '@easondev';
  const twitterUrl = 'https://x.com/easondev';

  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToast({ show: true, message: `${label} copied to clipboard!` });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

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
                <p className="text-gray-600">Send BTC directly (Mainnet)</p>
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
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Follow Me</h2>
                <p className="text-gray-600">Connect on X</p>
              </div>
            </div>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {twitterHandle}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
