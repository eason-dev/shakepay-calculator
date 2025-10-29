import { Suspense } from 'react';
import Calculator from './components/Calculator';

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-shakepay-blue text-xl">Loading calculator...</div>
      </div>
    }>
      <Calculator />
    </Suspense>
  );
}
