import { useState } from "react";
import { cityItineraries } from "../data/cities";

interface Props {
  city: string;
}

const DailyItinerary = ({ city }: Props) => {
  const itinerary = cityItineraries[city];
  // State to track which accordion item is open. Default to 0 (first day).
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!itinerary) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase mb-4" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          3-Day Perfect Itinerary
        </h5>
        
        <div className="accordion" id="itineraryAccordion">
          {itinerary.map((dayPlan, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="accordion-item border-0 mb-3 shadow-sm rounded overflow-hidden" key={dayPlan.day}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button 
                    className={`accordion-button ${!isOpen ? 'collapsed' : ''} bg-light`} 
                    type="button" 
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen ? "true" : "false"} 
                    style={{ color: "#2c3e50", fontWeight: "bold" }}
                  >
                    <span className="badge bg-primary me-3 rounded-pill">Day {dayPlan.day}</span>
                    {dayPlan.title}
                  </button>
                </h2>
                <div 
                  id={`collapse${index}`} 
                  className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`} 
                  aria-labelledby={`heading${index}`} 
                >
                  <div className="accordion-body bg-white">
                    <ul className="list-group list-group-flush">
                      {dayPlan.activities.map((activity, i) => (
                        <li key={i} className="list-group-item px-0 py-2 border-0 d-flex align-items-center">
                          <i className="bi bi-check-circle-fill text-success me-3"></i>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyItinerary;
