export default function Badge({ status }) {
  const configMap = {
    Pending:   'badge-pending',
    Preparing: 'badge-preparing',
    Ready:     'badge-ready',
    Completed: 'badge-completed',
  };

  const iconMap = {
    Pending: '🔴',
    Preparing: '🟡',
    Ready: '🟢',
    Completed: '✅',
  };

  return (
    <span className={`status-badge ${configMap[status] || 'badge-completed'}`}>
      <span className="dot" />
      <span>{iconMap[status]}</span>
      {status}
    </span>
  );
}
