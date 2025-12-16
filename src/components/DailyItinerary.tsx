import { useState, useEffect } from "react";
import { cityItineraries } from "../data/cities";

interface Props {
  city: string;
}

const DailyItinerary = ({ city }: Props) => {
  const itinerary = cityItineraries[city];
  // State to track which accordion item is open. Default to 0 (first day).
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // State to track selected activities
  const [selectedActivities, setSelectedActivities] = useState<Set<string>>(new Set());

  // Reset selections when city changes
  useEffect(() => {
    setSelectedActivities(new Set());
  }, [city]);

  if (!itinerary) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleActivity = (day: number, activityIndex: number) => {
    const id = `${day}-${activityIndex}`;
    const newSelected = new Set(selectedActivities);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedActivities(newSelected);
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase mb-4" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          <i className="bi bi-calendar-week-fill me-2" style={{ color: "#6f42c1" }}></i>
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
                      {dayPlan.activities.map((activity, i) => {
                        const isSelected = selectedActivities.has(`${dayPlan.day}-${i}`);
                        return (
                          <li 
                            key={i} 
                            className="list-group-item px-0 py-2 border-0 d-flex align-items-center"
                            onClick={() => toggleActivity(dayPlan.day, i)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className={`bi ${isSelected ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'} me-3 fs-5`}></i>
                            <span className={isSelected ? "text-dark fw-medium" : "text-muted"}>{activity}</span>
                          </li>
                        );
                      })}
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
