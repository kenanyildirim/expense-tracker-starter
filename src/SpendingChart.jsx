import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CATEGORY_COLORS = {
  food: '#fbbf24',
  housing: '#a855f7',
  utilities: '#22d3ee',
  transport: '#fb923c',
  entertainment: '#f472b6',
  salary: '#34d399',
  other: '#94a3b8',
};

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1a1f2e',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px',
        padding: '12px 16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}>
        <p style={{ color: '#7a8299', fontSize: '12px', marginBottom: '4px', textTransform: 'capitalize' }}>
          {label}
        </p>
        <p style={{ color: '#e8ecf4', fontSize: '16px', fontWeight: 600, fontFamily: 'Sora, sans-serif' }}>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

function SpendingChart({ transactions }) {
  const data = useMemo(() => {
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="spending-chart" role="region" aria-label="Spending by category chart">
        <h2>Spending by Category</h2>
        <p className="empty-state">No expense data to display.</p>
      </div>
    );
  }

  return (
    <div className="spending-chart" role="region" aria-label="Spending by category chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barSize={40} margin={{ top: 8, right: 8, bottom: 8, left: -12 }}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#7a8299', fontSize: 12, textTransform: 'capitalize' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#4a5168', fontSize: 12 }}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
