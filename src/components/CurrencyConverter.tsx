import { useState, useEffect } from "react";
import { cityCurrencies } from "../data/cities";

interface Props {
  city: string;
}

const CurrencyConverter = ({ city }: Props) => {
  const [amount, setAmount] = useState<string>("1");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isUsdBase, setIsUsdBase] = useState<boolean>(true);
  
  const currency = cityCurrencies[city];

  useEffect(() => {
    if (!currency) return;

    const fetchRate = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();
        if (data && data.rates && data.rates[currency.code]) {
          setRate(data.rates[currency.code]);
        } else {
          setError("Rate not found");
        }
      } catch (err) {
        setError("Failed to fetch rate");
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [currency]);

  if (!currency) return null;

  const numericAmount = Math.max(0, parseFloat(amount) || 0);
  
  let convertedAmount = "---";
  let displayRate = "---";

  if (rate) {
    if (isUsdBase) {
      convertedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.code }).format(numericAmount * rate);
      displayRate = `1 USD = ${rate} ${currency.code}`;
    } else {
      convertedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numericAmount / rate);
      displayRate = `1 ${currency.code} = ${(1/rate).toFixed(4)} USD`;
    }
  }

  const quickAmounts = [5, 10, 20, 50, 100];

  const handleSwap = () => {
    setIsUsdBase(!isUsdBase);
  };

  const inputCurrencyCode = isUsdBase ? "USD" : currency.code;
  const inputCurrencySymbol = isUsdBase ? "$" : currency.symbol;
  const outputCurrencyCode = isUsdBase ? currency.code : "USD";

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          <i className="bi bi-currency-exchange me-2 text-success"></i>
          Currency Converter
        </h5>
        <div className="mt-3">
          <div className="mb-3">
            <label htmlFor="amount-input" className="form-label small text-muted">Amount ({inputCurrencyCode})</label>
            <div className="input-group">
              <span className="input-group-text">{inputCurrencySymbol}</span>
              <input
                type="number"
                className="form-control"
                id="amount-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </div>
          </div>
          
          <div className="text-center mb-2">
            <button 
                className="btn btn-link text-decoration-none p-0" 
                onClick={handleSwap}
                title="Swap Currencies"
            >
                <i className="bi bi-arrow-down-up text-primary" style={{ fontSize: "1.5rem" }}></i>
            </button>
          </div>

          <div className="alert alert-light border text-center mb-0">
            {loading ? (
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : error ? (
              <div className="text-danger small">{error}</div>
            ) : (
              <>
                <div className="small text-muted">{outputCurrencyCode}</div>
                <div className="fs-4 fw-bold text-primary">
                  {convertedAmount}
                </div>
                <div className="small text-muted mt-1" style={{ fontSize: "0.7rem" }}>
                  {displayRate}
                </div>
              </>
            )}
          </div>

          {rate && !loading && !error && (
            <div className="mt-4">
              <h6 className="text-muted small text-uppercase mb-2">Quick Reference ({inputCurrencyCode})</h6>
              <div className="table-responsive">
                <table className="table table-sm table-borderless mb-0 small">
                  <tbody>
                    {quickAmounts.map((amt) => {
                        const converted = isUsdBase 
                            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.code }).format(amt * rate)
                            : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amt / rate);
                        
                        return (
                            <tr key={amt} className="border-bottom">
                                <td className="text-muted">{inputCurrencySymbol}{amt}</td>
                                <td className="text-end fw-bold text-dark">
                                {converted}
                                </td>
                            </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
