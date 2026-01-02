import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Note {
  id: string;
  text: string;
  date: string;
}

interface Props {
  city: string;
}

const TravelJournal = ({ city }: Props) => {
  const [notes, setNotes] = useLocalStorage<Note[]>(`travel-journal-${city}`, []);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      text: newNote,
      date: new Date().toLocaleDateString(),
    };
    setNotes([note, ...notes]);
    setNewNote("");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase mb-3" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          <i className="bi bi-journal-text me-2 text-primary"></i>
          Travel Journal
        </h5>
        <div className="mb-3">
          <textarea
            className="form-control mb-2"
            rows={3}
            placeholder={`Write your plans or memories for ${city}...`}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button className="btn btn-primary btn-sm w-100" onClick={addNote}>
            Add Note
          </button>
        </div>
        <div className="list-group list-group-flush" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {notes.length === 0 && (
            <div className="text-center text-muted py-3">
              <small>No notes yet. Start planning!</small>
            </div>
          )}
          {notes.map((note) => (
            <div key={note.id} className="list-group-item px-0">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="text-muted">{note.date}</small>
                  <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{note.text}</p>
                </div>
                <button 
                  className="btn btn-link text-danger btn-sm p-0 ms-2"
                  onClick={() => deleteNote(note.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelJournal;
