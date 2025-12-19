import { useState, useEffect } from "react";
import { cityCostMultipliers } from "../data/cities";

interface Props {
  city: string;
  onCostChange?: (cost: number) => void;
}

const baseRates = {
  Budget: 50,
  Standard: 150,
  Luxury: 400
};

const seasonMultipliers = {
  "Off-Peak": 0.85,
  "Standard": 1.0,
  "Peak": 1.4
};

const breakdownPercentages = {
  Budget: { Accommodation: 0.4, Food: 0.3, Transport: 0.2, Activities: 0.1 },
  Standard: { Accommodation: 0.45, Food: 0.3, Transport: 0.15, Activities: 0.1 },
  Luxury: { Accommodation: 0.5, Food: 0.25, Transport: 0.15, Activities: 0.1 }
};

const categoryColors: Record<string, string> = {
  Accommodation: "bg-primary",
  Food: "bg-success",
  Transport: "bg-info",
  Activities: "bg-warning"
};

const styleDescriptions = {
  Budget: "Hostels, public transport, street food",
  Standard: "3-star hotels, taxis/rental, casual dining",
  Luxury: "5-star hotels, private transfers, fine dining"
};

const TripBudgetEstimator = ({ city, onCostChange }: Props) => {
  const [travelers, setTravelers] = useState(1);
  const [days, setDays] = useState(3);
  const [style, setStyle] = useState<"Budget" | "Standard" | "Luxury">("Standard");
  const [season, setSeason] = useState<keyof typeof seasonMultipliers>("Standard");

  const multiplier = cityCostMultipliers[city] || 1;
  const seasonMult = seasonMultipliers[season];
  const dailyCost = baseRates[style] * multiplier * seasonMult;
  const totalCost = dailyCost * travelers * days;
  const breakdown = breakdownPercentages[style];

  useEffect(() => {
    if (onCostChange) {
      onCostChange(totalCost);
    }
  }, [totalCost, onCostChange]);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          <i className="bi bi-wallet2 me-2 text-warning"></i>
          Trip Budget Estimator
        </h5>
        <h3 className="card-text text-primary mb-2" style={{ color: "#2c3e50" }}>
          ${Math.round(totalCost).toLocaleString()}
          <span className="text-muted fs-6 ms-2">est. total</span>
        </h3>
        <div className="small text-muted mb-4">
            ${Math.round(totalCost / travelers).toLocaleString()} per person
        </div>

        {/* Visual Breakdown Bar */}
        <div className="mb-4">
            <div className="progress" style={{ height: "12px" }}>
                {Object.entries(breakdown).map(([category, percent]) => (
                    <div 
                        key={category}
                        className={`progress-bar ${categoryColors[category]}`} 
                        role="progressbar" 
                        style={{ width: `${percent * 100}%` }}
                        title={`${category}: $${Math.round(totalCost * percent).toLocaleString()}`}
                    ></div>
                ))}
            </div>
            <div className="d-flex justify-content-between mt-2 flex-wrap">
                {Object.entries(breakdown).map(([category, percent]) => (
                    <div key={category} className="d-flex align-items-center me-2">
                        <span className={`d-inline-block rounded-circle ${categoryColors[category]} me-1`} style={{width: '8px', height: '8px'}}></span>
                        <span className="small text-muted" style={{fontSize: '0.75rem'}}>
                            {category} (${Math.round(totalCost * percent).toLocaleString()})
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Compact Controls */}
        <div className="row g-2 mb-3">
            <div className="col-6">
                 <label className="form-label small text-muted">Travelers: <span className="fw-bold text-dark">{travelers}</span></label>
                 <input type="range" className="form-range range-luxury" min="1" max="10" value={travelers} onChange={(e) => setTravelers(parseInt(e.target.value))} />
            </div>
            <div className="col-6">
                 <label className="form-label small text-muted">Days: <span className="fw-bold text-dark">{days}</span></label>
                 <input type="range" className="form-range range-luxury" min="1" max="14" value={days} onChange={(e) => setDays(parseInt(e.target.value))} />
            </div>
        </div>

        <div className="mb-3">
            <label className="form-label small text-muted">Season</label>
            <select 
                className="form-select form-select-sm" 
                value={season} 
                onChange={(e) => setSeason(e.target.value as keyof typeof seasonMultipliers)}
            >
                {Object.keys(seasonMultipliers).map(s => (
                    <option key={s} value={s}>{s} Season (x{seasonMultipliers[s as keyof typeof seasonMultipliers]})</option>
                ))}
            </select>
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
          <div className="text-center mt-2 small text-muted fst-italic">
            {styleDescriptions[style]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripBudgetEstimator;
