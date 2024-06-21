import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const { _id, title, description, tag } = props.note;
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{title}</h5>
            <i className="fa-solid fa-pen-to-square mx-2"></i>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(_id)}}></i>
          </div>
          <p className="card-text">{description}</p>
          <p className="card-text">{tag}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
