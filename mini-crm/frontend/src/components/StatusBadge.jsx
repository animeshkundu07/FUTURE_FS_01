/**
 * StatusBadge: Displays a color-coded badge for lead status.
 */
const StatusBadge = ({ status }) => {
  const config = {
    new: { label: 'New', bg: '#dbeafe', color: '#1d4ed8', dot: '#3b82f6' },
    contacted: { label: 'Contacted', bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
    converted: { label: 'Converted', bg: '#d1fae5', color: '#065f46', dot: '#10b981' },
  };

  const { label, bg, color, dot } = config[status] || config.new;

  return (
    <span style={{ ...styles.badge, backgroundColor: bg, color }}>
      <span style={{ ...styles.dot, backgroundColor: dot }} />
      {label}
    </span>
  );
};

const styles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '3px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.02em',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
  },
};

export default StatusBadge;
