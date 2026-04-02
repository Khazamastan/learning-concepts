import { useMemo, useState } from 'react';

const MARKET = {
  BTC: { name: 'Bitcoin', price: 68000, change24h: 2.1 },
  ETH: { name: 'Ethereum', price: 3400, change24h: -1.2 },
  SOL: { name: 'Solana', price: 145, change24h: 3.4 },
  ADA: { name: 'Cardano', price: 0.42, change24h: 0.6 },
  DOGE: { name: 'Dogecoin', price: 0.18, change24h: -0.4 },
};

const initialHoldings = [
  { symbol: 'BTC', amount: 0.15 },
  { symbol: 'ETH', amount: 2.3 },
];

export default function App() {
  const [holdings, setHoldings] = useState(initialHoldings);
  const [symbol, setSymbol] = useState('BTC');
  const [amountInput, setAmountInput] = useState('');

  const portfolio = useMemo(() => {
    return holdings.map((holding) => {
      const market = MARKET[holding.symbol];
      const value = market.price * holding.amount;
      const delta = (market.price * (market.change24h / 100)) * holding.amount;
      return { ...holding, ...market, value, delta };
    });
  }, [holdings]);

  const totals = useMemo(() => {
    return portfolio.reduce(
      (acc, coin) => {
        acc.value += coin.value;
        acc.delta += coin.delta;
        return acc;
      },
      { value: 0, delta: 0 },
    );
  }, [portfolio]);

  const addHolding = (event) => {
    event.preventDefault();
    const amount = Number(amountInput);
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    setHoldings((current) => {
      const existing = current.find((entry) => entry.symbol === symbol);
      if (existing) {
        return current.map((entry) =>
          entry.symbol === symbol ? { ...entry, amount: entry.amount + amount } : entry,
        );
      }
      return [...current, { symbol, amount }];
    });
    setAmountInput('');
  };

  const updateAmount = (targetSymbol, amount) => {
    if (!Number.isFinite(amount) || amount < 0) {
      return;
    }

    setHoldings((current) =>
      current.map((entry) =>
        entry.symbol === targetSymbol ? { ...entry, amount } : entry,
      ),
    );
  };

  const removeHolding = (targetSymbol) => {
    setHoldings((current) => current.filter((entry) => entry.symbol !== targetSymbol));
  };

  return (
    <div className="app">
      <header>
        <h1>Crypto Portfolio Manager</h1>
        <p>Track positions, mock current value, and 24h movement with static market data.</p>
      </header>
      <section className="summary">
        <div>
          <span className="label">Portfolio value</span>
          <strong>${totals.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
        </div>
        <div>
          <span className="label">24h change</span>
          <strong className={totals.delta >= 0 ? 'positive' : 'negative'}>
            {totals.delta >= 0 ? '+' : '-'}${Math.abs(totals.delta).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </strong>
        </div>
      </section>
      <PortfolioTable
        portfolio={portfolio}
        onRemove={removeHolding}
        onUpdateAmount={updateAmount}
      />
      <form className="add-form" onSubmit={addHolding}>
        <h2>Add holdings</h2>
        <div className="field">
          <label htmlFor="symbol">Asset</label>
          <select id="symbol" value={symbol} onChange={(event) => setSymbol(event.target.value)}>
            {Object.entries(MARKET).map(([ticker, info]) => (
              <option key={ticker} value={ticker}>
                {info.name} ({ticker})
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.0001"
            value={amountInput}
            onChange={(event) => setAmountInput(event.target.value)}
            placeholder="e.g. 0.25"
          />
        </div>
        <button type="submit">Add to portfolio</button>
      </form>
    </div>
  );
}

function PortfolioTable({ portfolio, onRemove, onUpdateAmount }) {
  if (portfolio.length === 0) {
    return <p>No holdings yet. Add your first asset below.</p>;
  }

  return (
    <table className="portfolio">
      <thead>
        <tr>
          <th>Asset</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Value</th>
          <th>24h Δ</th>
          <th aria-label="Remove" />
        </tr>
      </thead>
      <tbody>
        {portfolio.map((coin) => (
          <tr key={coin.symbol}>
            <td>
              <div className="asset">
                <span className="ticker">{coin.symbol}</span>
                <span className="name">{coin.name}</span>
              </div>
            </td>
            <td>
              <input
                type="number"
                min="0"
                step="0.0001"
                value={coin.amount}
                onChange={(event) => onUpdateAmount(coin.symbol, Number(event.target.value))}
              />
            </td>
            <td>${coin.price.toLocaleString()}</td>
            <td>${coin.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
            <td className={coin.delta >= 0 ? 'positive' : 'negative'}>
              {coin.delta >= 0 ? '+' : '-'}${Math.abs(coin.delta).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </td>
            <td>
              <button type="button" className="ghost" onClick={() => onRemove(coin.symbol)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
