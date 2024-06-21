import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  // function to fetch all notes
  const getNotes = async () => {
    let url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MzEzNDUxZGVjZmRhOTFjMDc3NzA2In0sImlhdCI6MTcxODg2MjE0NX0.VEfpCbCDKpptgcUpDGQ9wmFpadvP6lZ0vtxLFB75iIY",
      },
    });
    const notes = await response.json();
    setNotes(notes);
  };
  const [notes, setNotes] = useState([]);

  // function to add note
  const addNote = async (title, description, tag) => {
    // api call
    let url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MzEzNDUxZGVjZmRhOTFjMDc3NzA2In0sImlhdCI6MTcxODg2MjE0NX0.VEfpCbCDKpptgcUpDGQ9wmFpadvP6lZ0vtxLFB75iIY",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // function to delete note
  const deleteNote = async (id) => {
    
  };

  // function to edit note
  const editNote = (id, title, description, tag) => {};

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
