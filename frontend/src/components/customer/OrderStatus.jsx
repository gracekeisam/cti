import { useEffect, useState } from 'react';
import Badge from '../shared/Badge';

const steps = ['Pending', 'Preparing', 'Ready'];

export default function OrderStatus({ order }) {
  const [currentStatus, setCurrentStatus] = useState(order.status);

  // Simulate status progression for demo
  useEffect(() => {
    if (currentStatus === 'Ready' || currentStatus === 'Completed') return;

    const idx = steps.indexOf(currentStatus);
    if (idx < 0 || idx >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStatus(steps[idx + 1]);
    }, 15000); // 15 seconds per step

    return () => clearTimeout(timer);
  }, [currentStatus]);

  const stepIndex = steps.indexOf(currentStatus);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Order Status</h3>
        <Badge status={currentStatus} />
      </div>

      {/* Progress Steps */}
      <div className="relative">
        {steps.map((step, i) => {
          const isDone = i <= stepIndex;
          const isCurrent = i === stepIndex;

          return (
            <div key={step} className="flex items-start gap-4 relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className={`absolute left-[15px] top-[32px] w-0.5 h-10 transition-colors duration-500 ${
                    i < stepIndex ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                />
              )}

              {/* Circle */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  isDone
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                } ${isCurrent ? 'ring-4 ring-orange-100' : ''}`}
              >
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold">{i + 1}</span>
                )}
              </div>

              {/* Label */}
              <div className="pb-10">
                <p
                  className={`font-medium text-sm ${
                    isDone ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {step === 'Pending' && 'Order received by kitchen'}
                  {step === 'Preparing' && 'Your food is being prepared'}
                  {step === 'Ready' && 'Ready for pickup!'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
