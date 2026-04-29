import Badge from '../shared/Badge';

const steps = ['Pending', 'Preparing', 'Ready'];

export default function OrderStatus({ order }) {
  const currentStatus = order.status;
  const stepIndex = steps.indexOf(currentStatus);
  const isCompleted = currentStatus === 'Completed' || currentStatus === 'Ready';

  return (
    <div className="bill-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B' }}>Order Status</h3>
        <Badge status={currentStatus} />
      </div>

      <div style={{ position: 'relative' }}>
        {steps.map((step, i) => {
          const isDone = i <= stepIndex || isCompleted;
          const isCurrent = i === stepIndex && !isCompleted;
          const descriptions = {
            Pending: 'Order received by kitchen',
            Preparing: 'Your food is being prepared',
            Ready: 'Ready for pickup!',
          };

          return (
            <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative' }}>
              {/* Connector */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', left: 15, top: 32,
                  width: 2, height: 40,
                  background: i < stepIndex || isCompleted ? '#F97316' : '#E2E8F0',
                  transition: 'background 0.5s',
                }} />
              )}
              {/* Circle */}
              <div style={{
                position: 'relative', zIndex: 1, width: 32, height: 32,
                borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isDone ? '#F97316' : '#F1F5F9',
                color: isDone ? '#FFF' : '#94A3B8',
                border: isDone ? 'none' : '2px solid #E2E8F0',
                boxShadow: isDone ? '0 4px 12px rgba(249,115,22,0.3)' : 'none',
                outline: isCurrent ? '4px solid rgba(249,115,22,0.15)' : 'none',
                transition: 'all 0.5s',
              }}>
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span style={{ fontSize: 12, fontWeight: 800 }}>{i + 1}</span>
                )}
              </div>
              {/* Label */}
              <div style={{ paddingBottom: 40 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: isDone ? '#1E293B' : '#94A3B8' }}>{step}</p>
                <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{descriptions[step]}</p>
                {isCurrent && (
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', animation: 'pulse 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#F97316' }}>In progress</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
