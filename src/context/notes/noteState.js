import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MzEzNDUxZGVjZmRhOTFjMDc3NzA2In0sImlhdCI6MTcxODg2MjE0NX0.VEfpCbCDKpptgcUpDGQ9wmFpadvP6lZ0vtxLFB75iIY";

  const [notes, setNotes] = useState([]);

  // function to fetch all notes
  const getNotes = async () => {
    try {
      let url = `${host}/api/notes/fetchnotes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "auth-token": authToken,
        },
      });
      const allNotes = await response.json();
      setNotes(allNotes);
    } catch (error) {
      console.log("message: ", error.message);
    }
  };

  // function to add note
  const addNote = async (title, description, tag) => {
    // api call
    try {
      let url = `${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag,
        }),
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.log("message: ", error.message);
    }
  };

  // function to delete note
  const deleteNote = async (id) => {
    try {
      let url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const deletedNote = await response.json();
      const newNotes = notes.filter((note) => {
        return note._id !== deletedNote.noteId;
      });
      setNotes(newNotes);
    } catch (error) {
      console.log("message: ", error.message);
    }
  };

  // function to edit note
  const editNote = (id, title, description, tag) => {
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
