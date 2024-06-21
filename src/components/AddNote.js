import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import AlertContext from "../context/alert/alertContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "general",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    showAlert("Note Added Successfully", "success");
    setNote({
      title: "",
      description: "",
      tag: "general",
    });
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
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter your custom tag"
            onChange={onChange}
          />
        </div>
        <button
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
