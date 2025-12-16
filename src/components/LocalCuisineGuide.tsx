import { cityCuisine } from "../data/cities";

interface Props {
  city: string;
}

const LocalCuisineGuide = ({ city }: Props) => {
  const cuisine = cityCuisine[city];

  if (!cuisine) return null;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase mb-4" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          <i className="bi bi-cup-hot-fill me-2 text-danger"></i>
          Local Cuisine Guide
        </h5>
        
        <div className="list-group list-group-flush">
          {cuisine.map((item, index) => (
            <div key={index} className="list-group-item border-0 px-0 py-3">
              <div className="d-flex w-100 justify-content-between align-items-center mb-1">
                <h6 className="mb-0 fw-bold text-dark">{item.dish}</h6>
                <span className="badge bg-light text-dark border rounded-pill">{index + 1}</span>
              </div>
              <p className="mb-0 small text-muted fst-italic">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalCuisineGuide;
