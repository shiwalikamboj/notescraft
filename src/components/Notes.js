import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes() {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    if (note.etag === "") {
      note.etag = "General";
    }
    editNote(note.eid, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };
  return (
    <>
      <AddNote />

      <div className="row my-3">
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group my-3">
                    <label htmlFor="etitle">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      placeholder="Enter title"
                      onChange={onChange}
                      value={note.etitle}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edescription">Description</label>
                    <textarea
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      placeholder="Enter description"
                      onChange={onChange}
                      value={note.edescription}
                      rows={5}
                      style={{ resize: "none" }}
                    />
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="etag">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      placeholder="Enter your custom tag"
                      onChange={onChange}
                      value={note.etag}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  disabled={
                    note.etitle.length < 3 || note.edescription.length < 4
                  }
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateNote}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2>Your Notes</h2>
        <div className="container mx-3 my-3">
          <h3 className="text-center">
            {notes.length === 0 && "No notes to display!!"}
          </h3>
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
