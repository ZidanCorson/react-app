import { useState } from "react";
import { cityCurrencies } from "../data/cities";

interface Props {
  city: string;
}

const CurrencyConverter = ({ city }: Props) => {
  const [amount, setAmount] = useState<number>(1);
  const currency = cityCurrencies[city];

  if (!currency) return null;

  const convertedAmount = (amount * currency.rate).toFixed(2);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
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
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>
          
          <div className="text-center mb-2">
            <i className="bi bi-arrow-down-circle text-primary" style={{ fontSize: "1.5rem" }}></i>
          </div>

          <div className="alert alert-light border text-center mb-0">
            <div className="small text-muted">{currency.code}</div>
            <div className="fs-4 fw-bold text-primary">
              {currency.symbol}{convertedAmount}
            </div>
            <div className="small text-muted mt-1" style={{ fontSize: "0.7rem" }}>
              1 USD = {currency.rate} {currency.code}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
