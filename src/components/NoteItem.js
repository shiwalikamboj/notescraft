import React, { useContext, useState, useEffect, useRef } from "react";
import NoteContext from "../context/notes/noteContext";

function truncateText(text, maxLength) {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
}

function NoteItem({ note, updateNote }) {
  const [showModal, setShowModal] = useState(false);
  const [descriptionText, setDescriptionText] = useState(""); // State to store description text
  const modalBodyRef = useRef(null); // Ref to the modal body

  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    // Update the description text state when the modal is opened
    setDescriptionText(note.description);
  }, [note.description]);

  useEffect(() => {
    // Check if the description has new lines, then disable word wrap in the modal body
    if (modalBodyRef.current && descriptionText.includes("\n")) {
      modalBodyRef.current.style.whiteSpace = "pre";
    }
  }, [descriptionText]);

  const tagStyle = {
    display: "inline-block",
    padding: "5px 10px",
    backgroundColor: "#e2e8f0",
    color: "#2d3748",
    borderRadius: "5px",
    marginTop: "10px",
    marginBottom: "3px",
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="align-items-center">
            <h5 className="card-text">{truncateText(note.title, 25)}</h5>
          </div>
          <p className="card-text">{truncateText(note.description, 58)}</p>
          <div style={tagStyle}>{note.tag}</div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={openModal}
            >
              View Note
            </button>
            <div>
              <i
                className="fa-solid fa-pen-to-square mx-2 py-2 text-primary"
                style={{ fontSize: "24px" }}
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
              <i
                className="fa-solid fa-trash mx-2 py-2 text-danger"
                style={{ fontSize: "24px" }}
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{note.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div
                className="modal-body"
                ref={modalBodyRef}
                style={{ overflowWrap: "break-word", whiteSpace: "pre-wrap" }}
              >
                {descriptionText}
              </div>
              <div className="modal-header">
                <h5 className="modal-title">{note.tag}</h5>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteItem;
