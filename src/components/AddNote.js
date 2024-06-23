import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleAddNote = (e) => {
    e.preventDefault();
    if (note.tag === "") {
      note.tag = "General";
    }
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
        <div className="form-group my-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter title"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            onChange={onChange}
            value={note.description}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter your custom tag (default: General)"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button 
          disabled={note.title.length < 3 || note.description.length < 4}
          type="submit"
          className="btn btn-primary"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;