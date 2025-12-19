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

  const numericAmount = parseFloat(amount) || 0;
  const convertedAmount = rate ? (numericAmount * rate).toFixed(2) : "---";

  const quickAmounts = [5, 10, 20, 50, 100];

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          <i className="bi bi-currency-exchange me-2 text-success"></i>
          Currency Converter
        </h5>
        <div className="mt-3">
          <div className="mb-3">
            <label htmlFor="usd-amount" className="form-label small text-muted">Amount (USD)</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                id="usd-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </div>
          </div>
          
          <div className="text-center mb-2">
            <i className="bi bi-arrow-down-circle text-primary" style={{ fontSize: "1.5rem" }}></i>
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
                <div className="small text-muted">{currency.code}</div>
                <div className="fs-4 fw-bold text-primary">
                  {currency.symbol}{convertedAmount}
                </div>
                <div className="small text-muted mt-1" style={{ fontSize: "0.7rem" }}>
                  1 USD = {rate} {currency.code}
                </div>
              </>
            )}
          </div>

          {rate && !loading && !error && (
            <div className="mt-4">
              <h6 className="text-muted small text-uppercase mb-2">Quick Reference</h6>
              <div className="table-responsive">
                <table className="table table-sm table-borderless mb-0 small">
                  <tbody>
                    {quickAmounts.map((amt) => (
                      <tr key={amt} className="border-bottom">
                        <td className="text-muted">${amt}</td>
                        <td className="text-end fw-bold text-dark">
                          {currency.symbol}{(amt * rate).toFixed(0)}
                        </td>
                      </tr>
                    ))}
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
