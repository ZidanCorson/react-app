import { useState } from "react";
import { cityCostMultipliers } from "../data/cities";

interface Props {
  city: string;
}

const TripBudgetEstimator = ({ city }: Props) => {
  const [travelers, setTravelers] = useState(1);
  const [days, setDays] = useState(3);
  const [style, setStyle] = useState<"Budget" | "Standard" | "Luxury">("Standard");

  const baseRates = {
    Budget: 50,
    Standard: 150,
    Luxury: 400
  };

  const multiplier = cityCostMultipliers[city] || 1;
  const dailyCost = baseRates[style] * multiplier;
  const totalCost = dailyCost * travelers * days;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          Trip Budget Estimator
        </h5>
        <h3 className="card-text text-primary mb-4" style={{ color: "#2c3e50" }}>
          ${Math.round(totalCost).toLocaleString()}
          <span className="text-muted fs-6 ms-2">est. total</span>
        </h3>

        <div className="mb-3">
          <label className="form-label small text-muted">Travelers</label>
          <input
            type="range"
            className="form-range range-luxury"
            min="1"
            max="10"
            value={travelers}
            onChange={(e) => setTravelers(parseInt(e.target.value))}
          />
          <div className="d-flex justify-content-between small text-muted">
            <span>1</span>
            <span className="fw-bold text-dark">{travelers} people</span>
            <span>10</span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small text-muted">Duration (Days)</label>
          <input
            type="range"
            className="form-range range-luxury"
            min="1"
            max="14"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
          />
          <div className="d-flex justify-content-between small text-muted">
            <span>1</span>
            <span className="fw-bold text-dark">{days} days</span>
            <span>14</span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small text-muted">Travel Style</label>
          <div className="btn-group w-100 btn-group-luxury" role="group">
            {(Object.keys(baseRates) as Array<keyof typeof baseRates>).map((s) => (
              <button
                key={s}
                type="button"
                className={`btn ${style === s ? "active" : ""}`}
                onClick={() => setStyle(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripBudgetEstimator;
