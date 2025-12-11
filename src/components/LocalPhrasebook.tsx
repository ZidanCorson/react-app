import { cityLanguages, languagePhrases } from "../data/cities";

interface Props {
  city: string;
}

const LocalPhrasebook = ({ city }: Props) => {
  const languageCode = cityLanguages[city];
  const phrases = languagePhrases[languageCode];

  if (!phrases) return null;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase mb-3" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          Local Phrasebook
        </h5>
        <div className="list-group list-group-flush">
          {phrases.map((item, index) => (
            <div key={index} className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center">
              <span className="fw-bold text-primary">{item.phrase}</span>
              <div className="text-end">
                <div className="text-dark">{item.translation}</div>
                {item.pronunciation && item.pronunciation !== item.translation && (
                   <div className="text-muted small fst-italic" style={{fontSize: "0.8rem"}}>{item.pronunciation}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalPhrasebook;
