import { cityLanguages, languagePhrases } from "../data/cities";

interface Props {
  city: string;
}

const languageNames: { [key: string]: string } = {
  "en-US": "English (US)",
  "en-GB": "English (UK)",
  "ja-JP": "Japanese",
  "fr-FR": "French",
  "ar-MA": "Arabic (Moroccan)",
  "zh-CN": "Chinese (Mandarin)",
};

const LocalPhrasebook = ({ city }: Props) => {
  const languageCode = cityLanguages[city];
  const phrases = languagePhrases[languageCode];

  if (!phrases) return null;

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageCode;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5
          className="card-title text-muted text-uppercase mb-3"
          style={{ fontSize: "0.9rem", letterSpacing: "1px" }}
        >
          <i className="bi bi-translate me-2 text-info"></i>
          Local Phrasebook ({languageNames[languageCode] || languageCode})
        </h5>
        <div className="list-group list-group-flush">
          {phrases.map((item, index) => (
            <div
              key={index}
              className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center"
            >
              <div className="me-3 flex-grow-1">
                <span className="fw-bold text-primary d-block">
                  {item.phrase}
                </span>
                <span className="text-dark">{item.translation}</span>
                {item.pronunciation &&
                  item.pronunciation !== item.translation && (
                    <div
                      className="text-muted small fst-italic"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {item.pronunciation}
                    </div>
                  )}
              </div>
              <div className="d-flex gap-2 flex-shrink-0">
                <button
                  className="btn btn-sm btn-outline-secondary rounded-circle"
                  style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() => handleSpeak(item.translation)}
                  title="Listen"
                >
                  <i className="bi bi-volume-up"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary rounded-circle"
                  style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() => handleCopy(item.translation)}
                  title="Copy"
                >
                  <i className="bi bi-clipboard"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalPhrasebook;
